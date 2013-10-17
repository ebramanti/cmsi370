// Big things have small beginnings...
$(function () {

    $("#confirm-delete-button").click(function () {
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
        console.log("Create confirmed!");
        window.location = "character.html#" + $("#createModal input.name").val()+"#"+ $("#createModal select.race").val()+"#"+ $("#createModal select.gender").val()+"#"+ $("#createModal select.skinTone").val()+"#"+ $("#createModal input.weight").val();
    });

    $("#confirm-edit-button").click(function () {
        console.log("Edit confirmed!");
    });

    $("#confirm-delete-item-button").click(function () {
        console.log("Delete confirmed!!!!!");

        // Now we dismiss the dialog.
        $('#deleteItemModal').modal('hide');
    });

    $("#confirm-create-item-button").click(function () {
        console.log("Create confirmed!");
        $('#createItemModal').modal('hide');
    });

    $("#confirm-edit-item-button").click(function () {
        console.log("Edit confirmed!");
        $('#editItemModal').modal('hide');
    });

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
            '<td><input type="checkbox" value="0"></td>' +
            '<td><a href="character.html#Patrick Stewart#Breton#Male#Light#1000">Patrick Stewart</a></td>' +
            '<td>Breton</td>' +
            '<td>Male</td>' +
            '<td>Light</td>' +
            '<td>1000lbs</td>' +
          '</tr>';

        $.getJSON(
            "http://lmu-diabolical.appspot.com/characters",
            function (characters) {
                // Do something with the character list.
                characters.forEach(function (character) {
                    var $characterRow = $(characterRowTemplate);
                    $characterRow.find("td:nth-child(2) > a")
                        .attr({ href: "character.html#" + character.id })
                        .text(character.name);
                    $characterRow.find("td:nth-child(3)").text(character.classType);
                    $characterRow.find("td:nth-child(4)").text(character.gender.substr(0, 1));
                    $("#character-table > tbody").append($characterRow);
                });
            }
        );
});
