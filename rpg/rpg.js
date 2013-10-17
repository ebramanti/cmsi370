// Big things have small beginnings...
$(function () {

    $("#confirm-delete-button").click(function () {
        console.log("Delete confirmed!!!!!");

        // Now we dismiss the dialog.
        $('#deleteModal').modal('hide');
    });

    $("#confirm-create-button").click(function () {
        console.log("Create confirmed!");
        window.location = "character.html#" + $("#createModal input.name").val()+"#"+ $("#createModal select.race").val()+"#"+ $("#createModal select.gender").val()+"#"+ $("#createModal select.skinTone").val()+"#"+ $("#createModal input.weight").val();
    });

    $("#confirm-edit-button").click(function () {
        console.log("Edit confirmed!");
        window.location = "character.html#" + $()
    });

    $('.table table-striped .link').on('click', function(e) {
	    e.preventDefault();
	    var $this = $(this);
	    var $collapse = $this.closest('.collapse-group').find('.collapse');
	    $collapse.collapse('toggle');
	});

});
