$(function () {
    $(".character-text-edit").characterLiveEdit ({
        change: function () {
            console.log($(this).text()); //Shows in console the changes made.
        }
    });
});