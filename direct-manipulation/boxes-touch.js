var BoxesTouch = {
    /**
     * Sets up the given jQuery collection as the drawing area(s).
     */
    setDrawingArea: function (jQueryElements) {
        // Set up any pre-existing box elements for touch behavior.
        jQueryElements
            .addClass("drawing-area")
            
            // Event handler setup must be low-level because jQuery
            // doesn't relay touch-specific event properties.
            .each(function (index, element) {
                element.addEventListener("touchstart", BoxesTouch.startCreate, false)
                element.addEventListener("touchmove", BoxesTouch.trackDrag, false);
                element.addEventListener("touchend", BoxesTouch.endDrag, false);
            })

            .find("div.box").each(function (index, element) {
                element.addEventListener("touchstart", BoxesTouch.startMove, false);
                element.addEventListener("touchend", BoxesTouch.unhighlight, false);
            });
    },

    startCreate: function (event) {
        $.each(event.changedTouches, function(index, touch) {
            touch.initialX = touch.pageX;
            touch.initialY = touch.pageY;
            var createdBox = '<div class="box" style="width: 0px; height: 0px; left:' + touch.pageX + 'px; top: ' + touch.pageY + 'px">' + '</div>';
            $("#drawing-area").append(createdBox);
            touch.creation = $("div div:last-child");
            touch.creation.addClass("creation-highlight");
            $("#drawing-area").find("div.box").each(function(index, element) {
                element.addEventListener("touchstart", BoxesTouch.startMove, false);
                element.addEventListener("touchend", BoxesTouch.unhighlight, false);
            });
        });
        event.stopPropagation();
    },

    /**
     * Tracks a box as it is rubberbanded or moved across the drawing area.
     */
    trackDrag: function (event) {
        $.each(event.changedTouches, function (index, touch) {
            event.preventDefault();
            // Don't bother if we aren't tracking anything.
            if (touch.target.movingBox) {
                // Reposition the object.
                touch.target.movingBox.offset ({
                    left: touch.pageX - touch.target.deltaX,
                    top: touch.pageY - touch.target.deltaY
                });
                //  Adds Deletion Highlight
                if (!((touch.target.movingBox).hasClass("box-delete")) && (touch.pageX - touch.target.deltaX > 512 || touch.pageY - touch.target.deltaY > 512 || touch.pageX - touch.target.deltaX < 0 || touch.pageY - touch.target.deltaY < 0)) {
                    touch.target.movingBox.addClass("box-delete deletion-highlight");
                }
                
                /* Removes Deletion Highlight,
                 * used if() instead of else() due to on-move oscillation between
                 * box-highlight and deletion-highlight with else() 
                 */
                if (((touch.target.movingBox).hasClass("box-delete")) && (touch.pageX - touch.target.deltaX < 512 && touch.pageY - touch.target.deltaY < 512 && touch.pageX - touch.target.deltaX > 0 && touch.pageY - touch.target.deltaY > 0)) {
                    touch.target.movingBox.removeClass("box-delete deletion-highlight");
                }
            }
            if (touch.creation) {
                var createLeft, createTop, createWidth, createHeight;

                if (touch.pageX < touch.initialX) {
                    createLeft = touch.pageX;
                    createWidth = touch.initialX - touch.pageX;
                    if (touch.pageY < touch.initialY) {
                        createTop = touch.pageY;
                        createHeight = touch.initialY - touch.pageY;
                    } else {
                        createTop = touch.initialY;
                        createHeight = touch.pageY - touch.initialY;
                    }
                } else {
                    createLeft = touch.initialX;
                    createWidth = touch.pageX - touch.initialX;
                    if (touch.pageY < touch.initialY) {
                        createTop = touch.pageY;
                        createHeight = touch.initialY - touch.pageY;
                    } else {
                        createTop = touch.initialY;
                        createHeight = touch.pageY - touch.initialY;
                    }
                }

            touch.creation
                    .offset({
                        left: createLeft,
                        top: createTop
                    })
                    .width(createWidth)
                    .height(createHeight);
            }
    });

        // Don't do any touch scrolling.
        event.preventDefault();
    },

    /**
     * Concludes a drawing or moving sequence.
     */
    endDrag: function (event) {
        $.each(event.changedTouches, function (index, touch) {
            if(touch.target.movingBox) {
                // Change state to "not-moving-anything" by clearing out
                // touch.target.movingBox.
                touch.target.movingBox = null;
            }
            if(touch.creation) {
                touch.creation.removeClass("creation-highlight");
                touch.creation = null;
            }
        });
    },

    /**
     * Indicates that an element is unhighlighted.
     */
    unhighlight: function () {
        $(this).removeClass("box-highlight");
        if ($(this).hasClass("box-delete")) {
            $(this).remove();
        }
    },

    /**
     * Begins a box move sequence.
     */
    startMove: function (event) {
        $.each(event.changedTouches, function (index, touch) {
            // Highlight the element.
            $(touch.target).addClass("box-highlight");

            // Take note of the box's current (global) location.
            var jThis = $(touch.target),
                startOffset = jThis.offset();

            // Set the drawing area's state to indicate that it is
            // in the middle of a move.
            touch.target.movingBox = jThis;
            touch.target.deltaX = touch.pageX - startOffset.left;
            touch.target.deltaY = touch.pageY - startOffset.top;
        });

        // Eat up the event so that the drawing area does not
        // deal with it.
        event.stopPropagation();
    }

};
