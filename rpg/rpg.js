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
	});
