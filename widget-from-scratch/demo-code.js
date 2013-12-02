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
        console.log("Clearing stuff son.");
        $("#edit-name, #edit-level, #edit-money").text("");
        $("#edit-classType").val("Edit Class Type");
        $("#edit-gender").val("Edit Gender");
    });
});