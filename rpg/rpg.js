// Big things have small beginnings...
$(function () {

    $("#confirm-delete-button").click(function () {
        var values = $('input:checkbox:checked.edit-delete-checkbox').map(function () {
            return this.value;
        }).get(); // ["18", "55", "10"]
        console.log(values.length);
        console.log(values);
        var k = 0;
        values.forEach(function(value, i) {   
            $.ajax({
                type: 'DELETE',
                url: "http://lmu-diabolical.appspot.com/characters/" + values[i].toString(),
                success: function (data, textStatus, jqXHR) {
                    console.log("Gone baby gone.");
                    k++;
                }
            });
            console.log(values[i]);
        });
        if (k > values.length) {
            window.location = "index.html";
        }
        console.log("Delete confirmed!!!!!");
        // Now we dismiss the dialog.
        $('#deleteModal').modal('hide');

    });

    $("#close-help-button").click(function () {
        console.log("Help close confirmed!!!!!");
        $('#helpModal').modal('hide');
    });

    $("#close-inventory-help-button").click(function () {
        console.log("Inventory help close confirmed!!!!!");
        $('#inventoryHelpModal').modal('hide');
    });

    $("#confirm-create-button").click(function () {
        var newCharacter = {
            name:$("#name").val(),
            classType:$("#classType").val(),
            gender:$("#gender").val().toUpperCase(),
            level:parseInt($("#level").val(), 10),
            money:parseInt($("#money").val(), 10)
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
                // The new character can be accessed from the Location header.
                console.log("You may access the new character at:" +
                    jqXHR.getResponseHeader("Location"));
                //window.location = "character.html#" + jqXHR.getResponseHeader("Location");
                window.location = "index.html";
            }
        });
        console.log("Create confirmed!");
        //characterList();
        $('#createModal').modal('hide');
    });

    $("#confirm-edit-button").click(function () {
        var value = $('input:checkbox:checked.edit-delete-checkbox').val();
        console.log(value);
        $.ajax({
            type: 'PUT',
            url: "http://lmu-diabolical.appspot.com/characters/" + value,
            data: JSON.stringify({
                id: value,
                name:$("#edit-name").val(),
                classType:$("#edit-classType").val(),
                gender:$("#edit-gender").val().toUpperCase(),
                level:parseInt($("#edit-level").val(), 10),
                money:parseInt($("#edit-money").val(), 10)
            }),
            contentType: "application/json",
            dataType: "json",
            accept: "application/json",
            success: function (data, textStatus, jqXHR) {
                console.log("Done: no news is good news.");
            }
        });
        $('#editModal').modal('hide');
    });
    $("#confirm-random-create-button").click(function () {
        var globalJsonVar;
        $.getJSON("http://lmu-diabolical.appspot.com/characters/spawn", 
            function (character) {
                globalJsonVar = character;
                console.log(JSON.stringify(character));
            }
        );
        console.log(JSON.stringify(globalJsonVar));
        $.ajax({
            type: 'POST',
            url: "http://lmu-diabolical.appspot.com/characters",
            data: JSON.stringify(globalJsonVar),
            contentType: "application/json",
            dataType: "json",
            accept: "application/json",
            complete: function (jqXHR, textStatus) {
                // The new character can be accessed from the Location header.
                console.log("You may access the new character at:" +
                    jqXHR.getResponseHeader("Location"));
                //window.location = "character.html#" + jqXHR.getResponseHeader("Location");
                window.location = "index.html";
            }
        });
        console.log("Random create confirmed!");
    });

    $("#confirm-edit-button").click(function () {
        console.log("Edit confirmed!");
    });

    $("#confirm-delete-item-button").click(function () {
        // Now we dismiss the dialog.
        $('#deleteItemModal').modal('hide');
    });

    $("#confirm-create-item-button").click(function () {
        console.log("Create confirmed!");
        $('#createItemModal').modal('hide');
    });


    if ($('.container').find(':checked').length >= 2) {
        console.log("Yo");
        $("#edit-button").attr("disabled", "disabled");
    }
    /*$("#createModal").validate({
        rules: {
            name: {
                minlength: 1,
                required: true
            },
            race: {
                required: true,
                !"Select a Race": true
            },
            gender: {
                required: true,
                !"Select a Gender": true
            },
            skinTone: {
                required: true,
                !"Select a Skin Tone": true
            },
            weight: {
                minlength: 1,
                $.isNumeric(): true
            }
        },
        messages: {
            name: "Please enter a valid name",
            race: "Please select a race",
            gender: "Please select a gender",
            skinTone: "Please select a skin tone",
            weight: "Please enter a valid weight"
        },
        highlight: function (element, errorClass, validClass) {
            $(element).closest('.modal-content').removeClass('success').addClass('error');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).closest('.modal-content').removeClass('error').addClass('success');
        },
        success: function (label) {
            $(label).closest('form').find('.valid').removeClass("invalid");
        },
        errorPlacement: function (error, element) {
            element.closest('.modal-content').find('.help-block').html(error.text());
        } */

        var characterRowTemplate = '<tr>' +
            '<td><input type="checkbox" class="edit-delete-checkbox" value=""></td>' +
            '<td><a href="character.html#"></a></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td></td>' +
          '</tr>';

        var characterList = function(){
            $.getJSON(
            "http://lmu-diabolical.appspot.com/characters",
            function (characters) {
                // Do something with the character list.
                $( ".character-table" ).empty();
                characters.forEach(function (character) {
                    var $characterRow = $(characterRowTemplate);
                    $characterRow.find("td:nth-child(1) > input")
                        .attr({ value: character.id })
                    $characterRow.find("td:nth-child(2) > a")
                        .attr({ href: "character.html#" + character.id })
                        .text(character.name);
                    //For Class Type and Gender, I format the text so that the first letter is capital, and the rest lowercase, regardless of user input.
                    $characterRow.find("td:nth-child(3)").text(character.classType);
                    $characterRow.find("td:nth-child(4)").text(character.gender.substr(0, 1).toUpperCase() + character.gender.substr(1).toLowerCase());
                    $characterRow.find("td:nth-child(5)").text(character.level);
                    $characterRow.find("td:nth-child(6)").text(character.money)
                    $("#character-table > tbody").append($characterRow);
                });
            });
        }
        characterList();

});
