(function() {
 
    var edgeSize = 50;
    var scrollTimer = null;

    function handleMousemove(event) {

        // Get the viewport-relative coordinates of the mousemove event.
        var viewportX = event.clientX;
        var viewportY = event.clientY;

        // Get the viewport dimensions.
        var viewportWidth = document.documentElement.clientWidth;
        var viewportHeight = document.documentElement.clientHeight;

        // Calculate the boundaries of the edge in the viewport
        var edgeTop = edgeSize;
        var edgeLeft = edgeSize;
        var edgeBottom = viewportHeight - edgeSize;
        var edgeRight = viewportWidth - edgeSize;

        var isInLeftEdge = viewportX < edgeLeft;
        var isInRightEdge = viewportX > edgeRight;
        var isInTopEdge = viewportY < edgeTop;
        var isInBottomEdge = viewportY > edgeBottom;

        if (!(isInLeftEdge || isInRightEdge || isInTopEdge || isInBottomEdge)) {
            clearTimeout(scrollTimer);
            
            return;
        }

        // Get the document dimensions.
        var documentWidth = Math.max(
            document.body.scrollWidth,
            document.body.offsetWidth,
            document.body.clientWidth,
            document.documentElement.scrollWidth,
            document.documentElement.offsetWidth,
            document.documentElement.clientWidth
        );

        var documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.body.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight,
            document.documentElement.clientHeight
        );

        // Calculate the maximum scroll offset in each direction
        var maxScrollX = documentWidth - viewportWidth;
        var maxScrollY = documentHeight - viewportHeight;

        (function checkForWindowScroll() {
            clearTimeout(scrollTimer);

            if (adjustWindowScroll()) {
                scrollTimer = setTimeout(checkForWindowScroll, 30);
            }
        })();

        // Adjust the window scroll based on the user's mouse position
        function adjustWindowScroll() {

            // Get the current scroll position of the document.
            var currentScrollX = window.pageXOffset;
            var currentScrollY = window.pageYOffset;

            // Determine if the window can be scrolled in any particular direction.
            var canScrollUp = currentScrollY > 0 ;
            var canScrollDown = currentScrollY < maxScrollY;
            var canScrollLeft = currentScrollX > 0;
            var canScrollRight = currentScrollX < maxScrollX;

            var nextScrollX = currentScrollX;
            var nextScrollY = currentScrollY;

            var maxStep = 50;

            if (isInLeftEdge && canScrollLeft) {
                var intensity = (edgeLeft - viewportX) / edgeSize;

                nextScrollX = nextScrollX - (maxStep * intensity);
            } 
            else if ( isInRightEdge && canScrollRight ) {
                var intensity = (viewportX - edgeRight) / edgeSize;

                nextScrollX = nextScrollX + (maxStep * intensity);
            }

            if (isInTopEdge && canScrollUp) {
                var intensity = (edgeTop - viewportY) / edgeSize;

                nextScrollY = nextScrollY - (maxStep * intensity);
            } 
            else if (isInBottomEdge && canScrollDown) {
                var intensity = (viewportY - edgeBottom) / edgeSize;

                nextScrollY = nextScrollY + ( maxStep * intensity );
            }

            // Sanitize invalid maximums
            nextScrollX = Math.max(0, Math.min(maxScrollX, nextScrollX));
            nextScrollY = Math.max(0, Math.min(maxScrollY, nextScrollY));

            if (nextScrollX !== currentScrollX || nextScrollY !== currentScrollY ) {
                window.scrollTo( nextScrollX, nextScrollY );
                return true;
            } 
            else {
                return false;
            }
        }
    }

    window.addEventListener('mousemove', handleMousemove, false);
})();