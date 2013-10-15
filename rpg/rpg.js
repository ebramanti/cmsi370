// Big things have small beginnings...
$(function () {

    $("#confirm-delete-button").click(function () {
        console.log("Delete confirmed!!!!!");

        // Now we dismiss the dialog.
        $('#deleteModal').modal('hide');
    });

    $("#confirm-create-button").click(function () {
        console.log("Create confirmed!!!!!");
        console.log($('#createModal select').val());
        //window.location = "character.html#789789789"
    });

});
