$(function () {
    $(".character-text-edit").characterLiveEdit ({
        change: function () {
            console.log($(this).text()); //Shows in console the changes made.
        }
    });

    //Edits a character.
    $("#confirm-edit-button").click(function () {
        $('#editModal').modal('hide');
    });

    //Clears edit modal if cancelled.
    $("#editModal").on("hidden.bs.modal", function() {
        console.log("Example reset.");
        $("#edit-name").text("Edward Bramanti");
        $("#edit-level, #edit-money").text(0);
        $("#edit-gender").val("Male");
    });
});