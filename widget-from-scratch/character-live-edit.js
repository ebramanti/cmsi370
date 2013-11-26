//CharacterLiveEdit.js, a JQuery plug-in that will allow live manipulation of given character attributes.
//Used in-place-editor from dondi/bazaar as a starting point, and making a few edits to work well with what I want for RPG.

(function ($) {
    $.fn.characterLiveEdit = function(options) {
        var $this = this;
        $this.addClass("character-editor");
        .hover(
            function (event) {
                $(this).append($("<span></span>").addClass("glyphicon glyphicon-edit"));
            },

            function (event) {
                $(this).find("span.glyphicon.glyphicon-edit").remove();
            }
        )
        .click(function (event) {
            var $receiver = $this,
                receiverOffset = $receiver.offset();
                $input = $("<input>")
        });
    }
}(jQuery));