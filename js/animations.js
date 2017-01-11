$(document).ready(function () {

    var $window = $(window);
    $animation_elements = $('.animation_element');
    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');
    
   

    function check_if_in_view() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($animation_elements, function () {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);
            var animation_type = ($element).data('animation');
            

            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) { 
                $element.addClass(animation_type);
            } else {
                $element.removeClass(animation_type);
            }
        });
    }

   
});