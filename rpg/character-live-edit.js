//CharacterLiveEdit.js, a JQuery plug-in that will allow live manipulation of given character attributes.
//Used in-place-editor from dondi/bazaar as a starting point, and redesigned to work well with what I want for RPG.

(function ($) {
    //  Injects overlay that occurs when editing text live.
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
                $(this).append($("<span></span>").addClass("character-live-edit glyphicon glyphicon-edit"));
            },

            function (event) {
                $(this).find("span.character-live-edit.glyphicon.glyphicon-edit").remove();
            }
        )
        .click(function (event) {
            //  Mental Note: "$this" must have parentheses. Reason: Will consider multiple elements otherwise.
            //  Without parens, when clicking in testing would return Initial and rest below it.
            var $attributeEditor = $(this),
                attributeOffset = $attributeEditor.offset(),
                $input = $("<input>") //  perfect for fields on my RPG edit modal.
                    .val($attributeEditor.text())
                    .blur(function (event) {
                            var $newInput = $(this);
                            //  Implemented a check for a complete deletion of input.
                            //  For my application, a user must enter an input if the editor is to be effective.
                            //  This will serve as a warning if no text is inputted for an edit.
                            if ($newInput.val() == "") {
                                $attributeEditor.text("Please enter attribute.");
                            }
                            else {
                                $attributeEditor.text($newInput.val()); //new input from the user for edits
                            }
                            $newInput.remove(); //  remove edits from overlay after success
                            $editOverlay.detach(); //   goodbye!
                            if ($.isFunction(options.change)) {
                                options.change.call($attributeEditor[0]);
                            }
                    })

                    .offset({
                        //  Used from Bazaar code, necessary for offset to format properly.
                        //  Puts text from newInput directly over attributeEditor.
                        //  According to Dondi, very experimental.
                        top: attributeOffset.top - 3 - $(window).scrollTop(),
                        //  YEAH BABY! Update the left offset dynamically by subtracting the offset of the modal.
                        //  The 8 is hardcoded and may be unstable.
                        left: attributeOffset.left - $("#edit-modal-body").offset().left + 8
                    })
                    .width($attributeEditor.width())
                    .height($attributeEditor.height() + 6);
                //console.log($("#edit-modal-body").offset().left);

            // JD: You're done with the var statement here, so decrease the indent.
                $("#edit-modal-body").append($editOverlay);
                $editOverlay.append($input);
                $input.focus().select();
        });
    }
}(jQuery));