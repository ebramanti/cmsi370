//CharacterLiveEdit.js, a JQuery plug-in that will allow live manipulation of given character attributes.
//Used in-place-editor from dondi/bazaar as a starting point, and redesigned to work well with what I want for RPG.

// JD: Admittedly I am a little foggy on what exactly this plugin extends from
//     what inPlaceEditor did.  Mainly it looks like a tweak to accommodate usage
//     in a modal...but in the end, what value does that have then?  When you are
//     in a modal, you are almost certainly in a form, and so it is natural to
//     have input fields there as-is.  The purpose of inPlaceEditor is to integrate
//     editability into displays that don't typically look editable.  When you are
//     in an editor modal, that aspect is just not very compelling.

(function ($) {
    //  Injects overlay that occurs when editing text live.
    var $editOverlay = $("<div></div>")
        // JD: Indenting by one additional level is enough for this.
            .addClass("character-editor-overlay");
    // JD: Blank line would have helped here.
    $.fn.characterLiveEdit = function(options) { // JD: Space after "function" please.
        var $this = this;
        $this.addClass("character-editor")
            // JD: Meanwhile, here, you *didn't* indent.  Stay consistent.
        .hover(
            function (event) {
                //  Attempted to add string "Edit" to <span>, but would auto-add to live edit.
                //  Could not figure out how to delete, best attempt:
                //  $(this).find("span").text("");
                // JD: Did you try adding "Edit" within a span of its own?  That's essentially
                //     what the edit glyphicon is doing; in this case, it would just use the
                //     standard font.
                $(this).append($("<span></span>").addClass("character-live-edit glyphicon glyphicon-edit"));
            },

            function (event) {
                $(this).find("span.character-live-edit.glyphicon.glyphicon-edit").remove();
            }
        )
        .click(function (event) {
            //  Mental Note: "$this" must have parentheses. Reason: Will consider multiple elements otherwise.
            //  Without parens, when clicking in testing would return Initial and rest below it.
            // JD: Yes, because in event handlers, "this" is the element in which the event
            //     took place.  Thus, the "this" in here is not the same as the "this" at
            //     the beginning of the plugin.
            var $attributeEditor = $(this),
                attributeOffset = $attributeEditor.offset(),
                $input = $("<input>") //  perfect for fields on my RPG edit modal.
                    .val($attributeEditor.text())
                    .blur(function (event) {
                        // JD: One level of indent is sufficient here.
                            var $newInput = $(this);
                            //  Implemented a check for a complete deletion of input.
                            //  For my application, a user must enter an input if the editor is to be effective.
                            //  This will serve as a warning if no text is inputted for an edit.
                            // JD: Understood, but, at the end of the day, for true reusability,
                            //     you should probably make this configurable.
                            if ($newInput.val() == "") { // JD: "" is falsy, so you can do (!$newInput.val())
                                $attributeEditor.text("Please enter attribute.");
                            } // JD: Feels more cohesive to keep the else on the same line.
                            else {
                                $attributeEditor.text($newInput.val()); //new input from the user for edits
                            }
                            $newInput.remove(); //  remove edits from overlay after success
                            $editOverlay.detach(); //   goodbye!
                            if ($.isFunction(options.change)) {
                                options.change.call($attributeEditor[0]);
                            }
                        // JD: No CSS mimicking for you?  That limits the elements on which you
                        //     can apply this plugin.
                    })

                    .offset({
                        //  Used from Bazaar code, necessary for offset to format properly.
                        //  Puts text from newInput directly over attributeEditor.
                        //  According to Dondi, very experimental.
                        top: attributeOffset.top - 3 - $(window).scrollTop(),
                        //  YEAH BABY! Update the left offset dynamically by subtracting the offset of the modal.
                        //  The 8 is hardcoded and may be unstable.
                        left: attributeOffset.left - $("#edit-modal-body").offset().left + 8
                        // JD: OK, cute, but...#edit-modal-body?  That means you can't reuse
                        //     your plugin on more than one modal on a web page.
                    })
                    .width($attributeEditor.width())
                    .height($attributeEditor.height() + 6);
                //console.log($("#edit-modal-body").offset().left);
                $("#edit-modal-body").append($editOverlay);
                $editOverlay.append($input);
                $input.focus().select();
        });
    }
}(jQuery));