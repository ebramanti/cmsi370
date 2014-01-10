// Big things have small beginnings...
$(function () {

    //  Moved template and row creator into a function.
    // JD: var functionName = function (...) syntax is preferred.
    function rowGenerator (character) {
        var characterTemplate = character;
        // All the code below displays characters in the main table.
        // EB: Correctly formatted code structure.
        var characterRowTemplate = '<tr id="">' +
            // JD: Indent to here---you are still inside this variable's declaration.
            //     (think HWPI: "How would Python indent?")
        '<td><input type="checkbox" class="edit-delete-checkbox" value=""></td>' +
        '<td><a href=""></a></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '</tr>';
        var $characterRow = $(characterRowTemplate);
            /*
             * EB: Added id to tr using JD's logic.
             */
            $characterRow.attr({ id: characterTemplate.id });
            $characterRow.find("td:nth-child(1) > input")
                .attr({ value: characterTemplate.id });
            $characterRow.find("td:nth-child(2) > a")
                .attr({ href: "character.html#" + characterTemplate.id })
                .text(characterTemplate.name);
            // For Class Type and Gender, I format the text so that the first letter is capital, and the rest lowercase, regardless of user input.
            $characterRow.find("td:nth-child(3)").text(characterTemplate.classType);
            $characterRow.find("td:nth-child(4)").text(characterTemplate.gender.substr(0, 1).toUpperCase() + character.gender.substr(1).toLowerCase());
            $characterRow.find("td:nth-child(5)").text(characterTemplate.level);
            $characterRow.find("td:nth-child(6)").text(characterTemplate.money);
            $("#character-table > tbody").append($characterRow);
    }

    //  This builds the characters within the character table in index.html.
    $.getJSON(
        "http://lmu-diabolical.appspot.com/characters",
        function (characters) {
            characters.forEach(function (character) {
                // JD: If you think about it, you do nothing but rowGenerator
                //     here, and it takes the same arguments.  This, you can just
                //     pass rowGenerator directly into forEach!
                //
                //          characters.forEach(rowGenerator);
                //
                //     Nice and compact, yes? :)
                //
                //     Note: This is why we prefer the "var" syntax for declaring
                //     functions---that form continues to emphasize (and lets you
                //     more easily recognize) that functions are first-class objects
                //     in JavaScript and can be passed as parameters, referenced as
                //     attributes, etc.  There *is* a method to this madness :)
                rowGenerator(character);
            });
        }
    );

    //  Creates a character.
    $("#confirm-create-button").click(function () {
        var newCharacter = {
            // EB: Fixed spaces next to colons throughout code.
            name: $("#name").val(),
            classType: $("#classType").val(),
            gender: $("#gender").val().toUpperCase(),
            level: parseInt($("#level").val(), 10),
            money: parseInt($("#money").val(), 10)
        };
        $.ajax({
            type: 'POST',
            url: "http://lmu-diabolical.appspot.com/characters",
            data: JSON.stringify(newCharacter),
            contentType: "application/json",
            dataType: "json",
            accept: "application/json",
            complete: function (jqXHR, textStatus) {
                //  window.location = "index.html";
                //  EB: Successfully implemented live update instead of using method above.
                console.log(jqXHR.getResponseHeader("Location"));
                rowGenerator(newCharacter);
                $('#createModal').modal('hide');   
            }
        });
    });

    // Adds data to edit modal for JQuery widget to use.
    $("#edit-button").click(function () {
        var value = $('input:checkbox:checked.edit-delete-checkbox').val();
        $.getJSON(
            "http://lmu-diabolical.appspot.com/characters/" + value,
            function (character) {
                // Do something with the character.
                $("#edit-name").append(character.name);
                $("#edit-level").append(character.level);
                $("#edit-money").append(character.money);
                $("#edit-classType").val(character.classType);
                $("#edit-gender").val(character.gender.substr(0, 1).toUpperCase() 
                    + character.gender.substr(1).toLowerCase());
            }
        );
    });

    //  Edits a character.
    $("#confirm-edit-button").click(function () {
        var value = $('input:checkbox:checked.edit-delete-checkbox').val();
        $.ajax({
            type: 'PUT',
            url: "http://lmu-diabolical.appspot.com/characters/" + value,
            data: JSON.stringify({
                id: value,
                name: $("#edit-name").text(),
                classType: $("#edit-classType").val(),
                gender: $("#edit-gender").val().toUpperCase(),
                level: parseInt($("#edit-level").text(), 10),
                money: parseInt($("#edit-money").text(), 10)
            }),
            contentType: "application/json",
            dataType: "json",
            accept: "application/json",
            success: function (data, textStatus, jqXHR) {
                // EB: Implemented live update edit.
                var characterId = "#" + value;
                $(characterId).find("td:nth-child(2) > a")
                    .text($("#edit-name").text());
                $(characterId).find("td:nth-child(3)").text($("#edit-classType").val());
                $(characterId).find("td:nth-child(4)")
                    .text($("#edit-gender").val().substr(0, 1).toUpperCase() + 
                        $("#edit-gender").val().substr(1).toLowerCase());
                $(characterId).find("td:nth-child(5)").text($("#edit-level").text());
                $(characterId).find("td:nth-child(6)").text($("#edit-money").text());
                $('#editModal').modal('hide'); // moved modal hide under success
            }
        });
    });

    //  Deletes a character.
    $("#confirm-delete-button").click(function () {
        var values = $('input:checkbox:checked.edit-delete-checkbox').map(function () {
            return this.value;
        }).get();
        values.forEach(function(value, i) {   
            $.ajax({
                type: 'DELETE',
                url: "http://lmu-diabolical.appspot.com/characters/" + values[i].toString(),
                success: function (data, textStatus, jqXHR) {
                    //  EB: Corrected previously commented out code, 
                    //      and implemented a live update delete.
                    $("#" + values[i]).remove();
                }
            });
        });
        $('#deleteModal').modal('hide'); //had to preserve because of forEach above.
    });

    //  Spawns a new, random character.
    $("#confirm-random-create-button").click(function () {
        var randomCharacter;
        $.getJSON("http://lmu-diabolical.appspot.com/characters/spawn", 
            function (character) {
                randomCharacter = character;
                $.ajax({
                    type: 'POST',
                    url: "http://lmu-diabolical.appspot.com/characters",
                    data: JSON.stringify(randomCharacter),
                    contentType: "application/json",
                    dataType: "json",
                    accept: "application/json",
                    complete: function (jqXHR, textStatus) {
                        //  window.location = "index.html";
                        //  EB: Like create, successfully implemented live update.
                        console.log(jqXHR.getResponseHeader("Location"));
                        rowGenerator(randomCharacter);
                        $('#createModal').modal('hide');
                    }
                });
            }
        );
    });

    //  Closes help modal.
    $("#close-help-button").click(function () {
        $('#helpModal').modal('hide');
    });

    //  Clears create modal if cancelled.
    $("#createModal").on("hidden.bs.modal", function() {
        console.log("Clearing stuff son.");
        $("#name, #level, #money").val("");
        $("#classType").val("Select a Class Type");
        $("#gender").val("Gender");
    });

    //  Clears edit modal if cancelled.
    $("#editModal").on("hidden.bs.modal", function() {
        console.log("Clearing stuff son.");
        $("#edit-name, #edit-level, #edit-money").text("");
        $("#edit-classType").val("Edit Class Type");
        $("#edit-gender").val("Edit Gender");
    });

    //  Callback for JQuery widget character-live-edit.
    $(".character-text-edit").characterLiveEdit ({
        change: function () {
            console.log($(this).text()); //Shows in console the changes made.
        }
    });
});
