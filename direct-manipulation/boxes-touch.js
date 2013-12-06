$(function () {
    var cache = {};  // All, like, private-like.
    // JD: Yep, private-like is the right like :)

    window.BoxesTouch = {
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
                var cacheEntry = { };
                cache[touch.identifier] = cacheEntry;

                cacheEntry.initialX = touch.pageX;
                cacheEntry.initialY = touch.pageY;

                // JD: Alternatively, you can define this "template" as a standalone
                //     string at the top, then set its attributes via jQuery, e.g.:
                //
                //     ...
                //     var cache = {},
                //         TEMP_BOX_TEMPLATE = '<div class="box"></div>';
                //
                //     ...
                //
                //     var $createdBox = $(TEMP_BOX_TEMPLATE).css({
                //         width: "0px",
                //         height: "0px",
                //         left: touch.pageX + "px",
                //         top: touch.pageY + "px"
                //     });
                //
                //     ...
                //
                //     You may find this approach to be a little more readable and
                //     less error-prone.
                //
                var createdBox = '<div class="box" style="width: 0px; height: 0px; left:' + touch.pageX + 'px; top: ' + touch.pageY + 'px">' + '</div>';
                // JD: Ack---you hardcoded #drawing-area!
                $("#drawing-area").append(createdBox);
                cacheEntry.creation = $("div div:last-child");
                cacheEntry.creation.addClass("creation-highlight");
                // JD: Space after "function" please----------->
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
                    var boxParent = $(touch.target.movingBox).parent(),
                        parentWidth = boxParent.width(),
                        parentHeight = boxParent.height();
                        parentLeft = boxParent.offset().left,
                        parentTop = boxParent.offset().top,
                        parentRight = parentLeft + parentWidth,
                        parentBottom = parentTop + parentHeight;

                    // Reposition the object.
                    touch.target.movingBox.offset ({
                        left: touch.pageX - touch.target.deltaX,
                        top: touch.pageY - touch.target.deltaY
                    });

                    //  Adds Deletion Highlight
                    // JD: Nice non-hardcoded drawing area :)
                    if (touch.pageX - touch.target.deltaX > parentRight || touch.pageY - touch.target.deltaY > parentBottom || 
                        touch.pageX - touch.target.deltaX < parentLeft || touch.pageY - touch.target.deltaY < parentTop) {
                        touch.target.movingBox.addClass("box-delete deletion-highlight");
                    }
                    
                    /* Removes Deletion Highlight,
                     * used if() instead of else() due to on-move oscillation between
                     * box-highlight and deletion-highlight with else() 
                     */
                    if (touch.pageX - touch.target.deltaX <= parentRight && touch.pageY - touch.target.deltaY <= parentBottom && 
                        touch.pageX - touch.target.deltaX >= parentLeft && touch.pageY - touch.target.deltaY >= parentTop) {
                        touch.target.movingBox.removeClass("box-delete deletion-highlight");
                    }
                }

                var cacheEntry = cache[touch.identifier];
                if (cacheEntry && cacheEntry.creation) {
                    var createLeft, createTop, createWidth, createHeight;

                    if (touch.pageX < cacheEntry.initialX) {
                        createLeft = touch.pageX;
                        createWidth = cacheEntry.initialX - touch.pageX;
                        // JD: Some code duplication with the Y computations.  Pull out to a function maybe?
                        if (touch.pageY < cacheEntry.initialY) {
                            createTop = touch.pageY;
                            createHeight = cacheEntry.initialY - touch.pageY;
                        } else {
                            createTop = cacheEntry.initialY;
                            createHeight = touch.pageY - cacheEntry.initialY;
                        }
                    } else {
                        createLeft = cacheEntry.initialX;
                        createWidth = touch.pageX - cacheEntry.initialX;
                        if (touch.pageY < cacheEntry.initialY) {
                            createTop = touch.pageY;
                            createHeight = cacheEntry.initialY - touch.pageY;
                        } else {
                            createTop = cacheEntry.initialY;
                            createHeight = touch.pageY - cacheEntry.initialY;
                        }
                    }

                    cacheEntry.creation
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
                if (touch.target.movingBox) {
                    // Change state to "not-moving-anything" by clearing out
                    // touch.target.movingBox.
                    touch.target.movingBox = null;
                }

                var cacheEntry = cache[touch.identifier];
                if (cacheEntry && cacheEntry.creation) {
                    // Do we want to keep it?
                    var $creation = $(cacheEntry.creation);
                    // JD: Yay, minimum size check!  To give "20" this meaning, it would probably
                    //     be good to stick it as another "private" variable like:
                    //
                    //     var MINIMUM_WIDTH = 20, MINIMUM_HEIGHT = 20;
                    if ($creation.width() < 20 || $creation.height() < 20) {
                        $creation.remove();
                    }

                    cacheEntry.creation.removeClass("creation-highlight");
                    cacheEntry.creation = null;
                    // Clean up.
                    delete cache[touch.identifier];
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
});
