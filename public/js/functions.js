$( document ).ready(function() {

var total = $("#total").val();
var itemOnPage = $("#itemOnPage").val();
var start = $("#start").val();
start = parseInt(start);


 $('#pagination-demo').pagination({
        items: total,
        itemsOnPage: 20,
		currentPage:start,
        cssStyle: 'light-theme',
		onPageClick: function (page, event) {
			 //console.log("page===================>"+page);
			 var link = window.location.href;
			 link = link.substring(0,link.indexOf("getVideoIframe"));
			 link = link+"getVideoIframe/"+page+"/"+itemOnPage
			 //console.log("link=================>"+link);
			 window.location.href = link;
		}
    });
	
});