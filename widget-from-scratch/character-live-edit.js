//CharacterLiveEdit.js, a JQuery plug-in that will allow live manipulation of given character attributes.
//Used in-place-editor from dondi/bazaar as a starting point, and making a few edits to work well with what I want for RPG.

(function ($) {
    //  Injects overlay that occurs when editing text live (.
    var $editOverlay = $("<div></div>")
            .addClass("character-editor-overlay");
    $.fn.characterLiveEdit = function(options) {
        var $this = this;
        $this.addClass("character-editor")
        .hover(
            function (event) {
                //  Attempted to add string "Edit" to <span>, but would auto-add to live edit.
                //  Could not figure out how to delete, best attempt:
                //  $(this).find("span").text("");
                $(this).append($("<span></span>").addClass("glyphicon glyphicon-edit"));
            },

            function (event) {
                $(this).find("span.glyphicon.glyphicon-edit").remove();
            }
        )
        .click(function (event) {
            var $attributeEditor = $this,
                attributeOffset = $attributeEditor.offset(),
                $input = $("<input>")
                    .val($attributeEditor.text())
                    .blur(function (event) {
                            var $newInput = $(this);
                            $attributeEditor.text($newInput.val()); //new input from the user for edits
                            $newInput.remove(); //remove edits after success
                            $editOverlay.detach();
                            if ($.isFunction(options.change)) {
                                options.change.call($attributeEditor[0]);
                            }
                    })

                    .css({ 
                            //Necessary for default size in editor; otherwise, style not preserved.
                            fontSize: $attributeEditor.css('font-size'),
                            fontStyle: $attributeEditor.css('font-style'),
                            fontWeight: $attributeEditor.css('font-weight'),
                            lineHeight: $attributeEditor.css('line-height')
                        })

                    .offset({
                            //  Used from Bazaar code, necessary for offset to format properly.
                            //  Puts text from newInput directly over attributeEditor.
                            //  According to Dondi, very experimental.
                            top: attributeOffset.top - 3 - $(window).scrollTop(),
                            left: attributeOffset.left - 3
                        })
                    .width($attributeEditor.width())
                    .height($attributeEditor.height() + 6);
                $("body").append($editOverlay);
                $editOverlay.append($input);
                $input.focus().select();
        });
    }
}(jQuery));