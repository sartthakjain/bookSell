$(document).ready(function () {

    var $window = $(window);
    $animation_elements = $('.animation_element');
    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');
    
    $('#sell').click(function () {
        $("#sell_modal").modal('show');
    });

    $('#buy').click(function () {
        document.location.href = 'books.html';
    });

    $('.close').click( function deleteRow() {
        var row = this.parentNode.parentNode;
        $(row).remove();
    });

    $('#sellBooksTable').on('click', 'button[type="button"]', function (e) {
        $(this).closest('tr').remove();
    });

    $('#add-another-book').click(function (event) {
        event.preventDefault();
        var newRow = jQuery('  <tr><td style="padding:10px;"><input type="text" class="form-control"  placeholder="Book Name" /></td><td><select name="sellBookCondition" class="form-control">  <option value="1">Excllent</option> <option value="2">Good</option> </select>  </td> <td><select name="sellBookQuantity" class="form-control"> <option value="1">1</option><option value="2">2</option> <option value="2">3</option> <option value="2">4</option><option value="2">5</option> </select></td><td><span class="book-selling-price"></span><span class="quant"></span></td><td><button class="close" type="button">&times;</button></td></tr> '
                        );
        jQuery("#sellBooksTable").append(newRow);
    });


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