$(document).ready(function () {

   
    fetch_book_data(0);



    


    //search on book listing page without page refresh
    var $books = document.getElementById('searchResults');
    var bookForm = $('#bookSearchForm');
    bookForm.submit(function (e) {



        var formattr = bookForm.serialize();  //form variables are stored here
        console.log(formattr);
       e.preventDefault();
       var semester=$('#sem_form_2').val();
       var branch = $('#branch_form_2').val();

       if (branch != undefined && semester != undefined) {
           var searchUrl = "http://52.11.56.39:8000/books/sell/get/books?semester=" + semester + "&branch=" + branch;   //api url of book search by branch and semester
       } else {
           var searchUrl = "http://52.11.56.39:8000/books/sell/get/books";
           }

       while ($books.firstChild) {
            $books.removeChild($books.firstChild);
        }


        $.ajax({
            url: searchUrl,   //"url of book search by branch and semester"+formattr,
            type: 'GET',
            success: function (result) {
                console.log(result["books"]);
                $.each(result["books"], function (i, book) {                 
                    var bookdata = "<div class=\"row bookdisplay\" style=\"background-color:whitesmoke;\"><div class=\"row\" style=\"padding:10px;\"><img class=\"img-responsive col-xs-2\" src=\"/images/booklogo.png\" style=\"width:200px;\" /><div class=\"col-xs-8\"><div class=\"row\"><h2 class=\" col-xs-9\">" + book.book_name + "</h2><h2 class=\"col-xs-3\" ><span class=\"label label-default\">Rs " + book.price + "</span></h4></div><div class=\"row\"><h6 class=\"col-xs-8 row\">Branch : " + book.branch + "</h6><h6 class=\"col-xs-8 row\">Condition : " + book.book_condition + "</h6><div class=\"row\"><h6 class=\"col-xs-9\">Quantity : " + book.quantity + "</h6><button  type=\"button\" class=\"btn btn-success col-xs-offset-9\">PURCHASE</button></div></div></div></div></div>";
                   $('#searchResults').append(bookdata);
                    $('.bookdisplay').addClass('show_four');
                });


            }

        });



    });


    $('#sell').click(function () {
        $("#sell_modal_2").modal('show');
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
     //   sellBookAutocomplete();
    });
    $('.bookConditionId').on('focus', function () {
      //  changeCondition();
    });

    $('.bookQuantityId').on('focus', function () {
     //   changeQuant();
    });

    $('#sort_alphabatical').on('change', function () {
        var sort = $('#sort_alphabatical').val();
        fetch_book_data(sort);
        
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
    var quantity = 1;
    var semester = $('#bookQuantityId2').val();
    var price = $('#bookPriceId2').val();
    var branch = $('#bookBranchId2').val();
    console.log(book_name);
    $.ajax({
        url: 'http://52.11.56.39:8000/books/sell/sell/books',    //post url here.
        type: 'POST',
        data: {
            "book_name": book_name,
            "condition": condition,
            "quantity": quantity,
            "price": price,
            "semester": semester,
            "branch": branch
        },
        success: function (response) {
            console.log(response);
            alert(response.message);
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


var fetch_book_data = function (sort) {
    //variables that catch from the url
    var book_name = getUrlParameter('temp');
    var branch = getUrlParameter('branch');
    var semester = getUrlParameter('semester');

    console.log(book_name, branch, semester);
    if (book_name != undefined) {
        var searchUrl = 'http://52.11.56.39:8000/books/sell/get/book/names?book_name=' + book_name;  //api url of  book search by name
    }
    else {
        if (branch != undefined && semester != undefined) {
            var searchUrl = "http://52.11.56.39:8000/books/sell/get/books?semester=" + semester + "&branch=" + branch;   //api url of book search by branch and semester
        } else {
            var searchUrl = "http://52.11.56.39:8000/books/sell/get/books";   //api url of book search by branch and semester
        }
    }
    console.log(sort);
    console.log(searchUrl);
    var $books = document.getElementById('searchResults');
    
    while ($books.firstChild) {
        $books.removeChild($books.firstChild);
    }

    $.ajax({
        url: searchUrl,
        type: 'GET',
        success: function (results) {
            console.log(results);
            console.log(sort, "this inner");
            if (sort == 0) {
                results["books"].sort();
            } else {
                results["books"].reverse();
            }
                $.each(results["books"], function (i, book) {
                var bookdata = "<div class=\"row bookdisplay animation_element\"data-animation=\"show_one\" style=\"background-color:whitesmoke;\"><div class=\"row\" style=\"padding:10px;\"><img class=\"img-responsive col-xs-2\" src=\"/images/booklogo.png\" style=\"width:200px;\" /><div class=\"col-xs-8\"><div class=\"row\"><h2 class=\" col-xs-9\">" + book.book_name + "</h2><h2 class=\"col-xs-3\" ><span class=\"label label-default\">Rs " + book.price + "</span></h4></div><div class=\"row\"><h6 class=\"col-xs-8 row\">Branch : " + book.branch + "</h6><h6 class=\"col-xs-8 row\">Condition : " + book.book_condition + "</h6><div class=\"row\"><h6 class=\"col-xs-9\">Quantity : " + book.quantity + "</h6><button  type=\"button\" class=\"btn btn-success col-xs-offset-9\">PURCHASE</button></div></div></div></div></div>";
                $('#searchResults').append(bookdata);
                $('.bookdisplay').addClass('show_four');
            });

        }
    });



};