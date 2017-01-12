$(document).ready(function () {

    var book_name = getUrlParameter('temp');
    console.log(book_name);
    if (book_name != undefined) {

        $.ajax({
            url: 'https://api.myjson.com/bins/d99pz',    //temp url add book_name variable as parameter in new url
            type: 'GET',
            success: function (results) {
                $.each(results["books"], function (i, book) {

                    console.log(results);
                    $.each(results["books"], function (i, book) {
                        $('#searchResults').append(' <li><div class="row "><div class="row"><h2 class=" col-xs-7"><i>JAVA by HC Verma</i></h2><h2 class="col-xs-3 col-lg-offset-2"><span class="label label-warning">Rs 400</span></h4></div><div class="row"><h6 class="col-xs-7"><b>BRANCH</b></h6><h3 class="col-xs-3 col-lg-offset-2"><span class="label label-default">condition</span></h4></div><button  type="button" class="btn btn-success ">PURCHASE</button></div> </li>');
                        $('.bookdisplay').addClass('show_four');
                    });

                });

            }
        });

    }



    var $books = document.getElementById('searchResults');
    var bookForm = $('#bookSearchForm');
    bookForm.submit(function (e) {
        var formattr = bookForm.serialize();
        console.log(formattr);
        e.preventDefault();

        while ($books.firstChild) {
            $books.removeChild($books.firstChild);
        }


        $.ajax({
            url: "https://api.myjson.com/bins/t9tw7",                     //"https://acadstaging.com/acadproject/get/books?"+formattr,
            type: 'GET',
            success: function (result) {

                console.log(result);
                $.each(result["books"], function (i, book) {
                    $('#searchResults').append(' <li><div class="row "><div class="row"><h2 class=" col-xs-7"><i>JAVA by HC Verma</i></h2><h2 class="col-xs-3 col-lg-offset-2"><span class="label label-warning">Rs 400</span></h4></div><div class="row"><h6 class="col-xs-7"><b>BRANCH</b></h6><h3 class="col-xs-3 col-lg-offset-2"><span class="label label-default">condition</span></h4></div><button  type="button" class="btn btn-success ">PURCHASE</button></div> </li>');
                    $('.bookdisplay').addClass('show_four');
                });


            }

        });



    });


    $('#sell').click(function () {
        $("#sell_modal").modal('show');
    });

    $('#buy').click(function () {
        document.location.href = 'books.html';
    });

    $('.close').click(function deleteRow() {
        var row = this.parentNode.parentNode;
        $(row).remove();
    });

    $('#sellBooksTable').on('click', 'button[type="button"]', function (e) {
        $(this).closest('tr').remove();
    });

    $('#add-another-book').click(function (event) {
        event.preventDefault();
        var newRow = jQuery(

            '<tr><td style=\"padding:10px;\"><div class=\"ui-widget\"><input type=\"text\" class=\"form-control sellform sellBookId\" placeholder=\"Book Name\" name=\"sellBookName\"  /></div></td><td><select name=\"sellBookCondition\" class=\"form-control sellform bookConditionId\" ><option value=\"excellent\">Excllent</option><option value=\"good\">Good</option></select></td><td><select name=\"sellBookQuantity\" class=\"form-control sellform bookQuantityId\" ><option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option><option value=\"4\">4</option><option value=\"5\">5</option></select></td><td><span class=\"book-selling-price bookSellingPriceId\" ></span><span class=\"quant\"></span></td><td><button class=\"close\" type=\"button\">&times;</button></td></tr>');
        jQuery("#sellBooksTable").append(newRow);
        sellBookAutocomplete();
        changeCondition();
        changeQuant();
    });

    $('.sellBookId').on('focus', function () {
        sellBookAutocomplete();
    });
    $('.bookConditionId').on('focus', function () {
        changeCondition();
    });

    $('.bookQuantityId').on('focus', function () {
        changeQuant();
    });






    function sellBookAutocomplete() {

        var availableTags;
        $.ajax({
            url: "https://acadstaging.com/acadproject/get/book/names",
            type: 'GET',
            success: function (result) {
                availableTags = result["book_names"];
                console.log(availableTags);


                $('.sellform').each(function () {
                    $('.sellBookId').autocomplete({
                        source: availableTags,
                        select: function (e, ui) {


                            var currentTag = this;
                            var name = ui.item.value;
                            //var name=$('.sellBookId').val();
                            var condition = $(currentTag).parent().parent().parent().find('.bookConditionId').val();
                            //  var condition = $('.bookConditionId').val();
                            var bookQuant = $(currentTag).parent().parent().parent().find('.bookQuantityId').val();
                            //   var bookQuant=$('.bookQuantityId').val();

                            console.log(name + condition + bookQuant);
                            $.ajax(
                                {
                                    url: "https://acadstaging.com/acadproject/sell/books?book_name=" + name + "&condition=" + condition,
                                    type: 'GET',
                                    success: function (result) {
                                        console.log(result);
                                        var price = result["price"];
                                        $(currentTag).parent().parent().parent().find('.bookSellingPriceId').html("Rs" + price);
                                        $(currentTag).parent().parent().parent().find('.quant').html("&times;" + bookQuant);
                                    }
                                }


                            );
                        }
                    });

                    $(".sellBookId").autocomplete("option", "appendTo", "#sellBooksTable");

                    $

                });

            }
        });



    };

    function changeCondition() {
        $('.bookConditionId').on('change', function () {
            var currentTag = this;
            var name = $(currentTag).parent().parent().find('.sellBookId').val();
            var condition = $(currentTag).val();
            console.log(condition);
            $.ajax({
                url: "https://acadstaging.com/acadproject/sell/books?book_name=" + name + "&condition=" + condition,
                type: 'GET',
                success: function (result) {
                    console.log(result);
                    var price = result["price"];
                    $(currentTag).parent().parent().find('.bookSellingPriceId').html("Rs" + price);
                    $(currentTag).parent().parent().find('.quant').html("&times;" + bookQuant);
                }
            });

        });






    }

    function changeQuant() {
        $('.bookQuantityId').on('change', function () {
            var currentTag = this;
            var bookQuant = $(currentTag).val();
            $(currentTag).parent().parent().find('.quant').html("&times;" + bookQuant);

        });


    }


});







//book search by name form
var bookform = $('#book_name_main_value');
$('#book_name_main').submit(function (e) {
    e.preventDefault();
    var book_name = bookform.val();
    window.location = "/books.html?temp=" + book_name;

});

//sell book POST call
var sell_form_2 = $('#sell_form_2');
sell_form_2.submit(function (e) {
    e.preventDefault();
    var book_name = $('#sellBookName2').val();
    var condition = $('#bookConditionId2').val();
    var quantity = $('#bookQuantityId2').val();
    var price = $('#bookPriceId2').val();
    console.log(book_name);
    $.ajax({
        url: '',
        type: 'POST',
        data: {
            "book_name": "Java",
            "condition": "Good",
            "quantity": 5,
            "price": 890,
            "semester": 2,
            "branch": "CSE"
        },
        success: function () {

        }

    });
});



var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};