// Big things have small beginnings...
$(function () {
    //Creates a character.
    $("#confirm-create-button").click(function () {
        var newCharacter = {
            // EB: Fixed spaces next to colons throughout code.
            name: $("#name").val(),
            classType: $("#classType").val(),
            gender: $("#gender").val().toUpperCase(),
            level: parseInt($("#level").val(), 10),
            money: parseInt($("#money").val(), 10)
        };
        console.log(newCharacter);
        $.ajax({
            type: 'POST',
            url: "http://lmu-diabolical.appspot.com/characters",
            data: JSON.stringify(newCharacter),
            contentType: "application/json",
            dataType: "json",
            accept: "application/json",
            complete: function (jqXHR, textStatus) {
                window.location = "index.html"; //left in, had difficulty implementing live update
                // JD: Noted; you were probably hitting an early bug with the server,
                //     which is fixed now.
            }
        });
        $('#createModal').modal('hide');
    });

    $("#edit-button").click(function () {
        var value = $('input:checkbox:checked.edit-delete-checkbox').val();

        $.getJSON(
            "http://lmu-diabolical.appspot.com/characters/" + value,
            function (character) {
                // Do something with the character.
                $("#edit-name").append(character.name);
                $("#edit-level").append(character.level);
                $("#edit-money").append(character.money);
            }
        );
    });

    //Edits a character.
    $("#confirm-edit-button").click(function () {
        var value = $('input:checkbox:checked.edit-delete-checkbox').val();
        console.log(value);
        $.ajax({
            type: 'PUT',
            url: "http://lmu-diabolical.appspot.com/characters/" + value,
            data: JSON.stringify({
                id: value,
                name: $("#edit-name").val(),
                classType: $("#edit-classType").val(),
                gender: $("#edit-gender").val().toUpperCase(),
                level: parseInt($("#edit-level").val(), 10),
                money: parseInt($("#edit-money").val(), 10)
            }),
            contentType: "application/json",
            dataType: "json",
            accept: "application/json",
            success: function (data, textStatus, jqXHR) {
                window.location = "index.html"; //left in, had difficulty implementing live update
                // JD: This takes a little more code but it is certainly worth
                //     doing when you have the time.
            }
        });
        $('#editModal').modal('hide');
    });

    //Deletes a character.
    $("#confirm-delete-button").click(function () {
        var values = $('input:checkbox:checked.edit-delete-checkbox').map(function () {
            return this.value;
        }).get();
        var k = 0;
        values.forEach(function(value, i) {   
            $.ajax({
                type: 'DELETE',
                url: "http://lmu-diabolical.appspot.com/characters/" + values[i].toString(),
                success: function (data, textStatus, jqXHR) {
                    window.location = "index.html"; //left in, had difficulty implementing live update
                    /*
                     * My attempt at adding a live delete update from class.
                     * $("#" + values[i].remove());
                     *
                     */
                    // JD: Looks like a good attempt; would be nice to see you finish this.
                }
            });
        });
        $('#deleteModal').modal('hide');

    });

    //Spawns a new, random character.
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
                        window.location = "index.html"; //left in, had difficulty implementing live update
                        // JD: Yay nested Ajax calls!  Essentially, here, you want to create
                        //     a tr for the new character, then add that tr to the table.
                    }
                });
            }
        );
        $('#createModal').modal('hide');
    });

    //Closes help modal.
    $("#close-help-button").click(function () {
        $('#helpModal').modal('hide');
    });

    //Clears create modal if cancelled.
    $("#createModal").on("hidden.bs.modal", function() {
        $("#name, #level, #money").val("");
        $("#classType").val("Select a Class Type");
        $("#gender").val("Gender");
    });

    //Clears edit modal if cancelled.
    $("#editModal").on("hidden.bs.modal", function() {
        console.log("Clearing stuff son.");
        $("#edit-name, #edit-level, #edit-money").text("");
        $("#edit-classType").val("Edit Class Type");
        $("#edit-gender").val("Edit Gender");
    });

    // All the code below displays characters in the main table.
    // EB: Correctly formatted code structure.
    var characterRowTemplate = '<tr id="">' +
        '<td><input type="checkbox" class="edit-delete-checkbox" value=""></td>' +
        '<td><a href=""></a></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
      '</tr>';
        
    $.getJSON(
    "http://lmu-diabolical.appspot.com/characters",
    function (characters) {
        characters.forEach(function (character) {
            var $characterRow = $(characterRowTemplate);
            /*
             * EB: Added id to tr using JD's logic.
             */
            $characterRow.attr({ id: character.id });
            $characterRow.find("td:nth-child(1) > input")
                .attr({ value: character.id });
            $characterRow.find("td:nth-child(2) > a")
                .attr({ href: "character.html#" + character.id })
                .text(character.name);
            //For Class Type and Gender, I format the text so that the first letter is capital, and the rest lowercase, regardless of user input.
            $characterRow.find("td:nth-child(3)").text(character.classType);
            $characterRow.find("td:nth-child(4)").text(character.gender.substr(0, 1).toUpperCase() + character.gender.substr(1).toLowerCase());
            $characterRow.find("td:nth-child(5)").text(character.level);
            $characterRow.find("td:nth-child(6)").text(character.money);
            $("#character-table > tbody").append($characterRow);
        });

    });

});
