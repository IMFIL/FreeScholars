
$("#leftitem").click(function(){
});

$("#middleitem").click(function(){
});

$("#rightitem").click(function(){
});

function search(){
    //add a loop to get the descripton and the name just in case you get more than one result, make sure the search also works for both the databases
    $(".search-box").empty();
    let search = $("#searchInput").val();
    if(search.length != 0){
       $.ajax({
            type: 'get',
            url: '/search',
            data: {
                search: search,
            }
        }).done(function (data) {
           let i
           data = JSON.parse(data);
           if(data.length != 0){
               $( ".search" ).animate({height: "50vh" }, 1100 );
               $("html, body").animate({ scrollTop: $(document).height() }, 1100).promise().then(function(){
                   $(".search-box").append(" <div class='search-result-template'><h3>" +data[0][0] + "</h3><p>" +data[0][1] +"</p></div>");  
               });
               
           }
           else{
               $( ".search" ).animate({  height: "45vh" }, 1100 );
               $("html, body").animate({ scrollTop: $(document).height() }, 1100).promise().then(function(){
                   $(".search-box").append(" <div class='search-result-template'><h3>Nothing found...</h3><p></p></div>");  
               });
           }
       });
    }  
};

$("#submitSearch").click(function(){
    search();
});

$("#searchInput").keyup(function(event){
    if(event.keyCode == 13){
        search();
    }
});

$('#searchInput').on('input', function(e) {
    if('' == this.value) {
        $(".search-box").empty();
        $( ".search" ).animate({  height: "40vh" }, 1100 );
    }
});