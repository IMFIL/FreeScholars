
$("#leftitem").click(function(){
});

$("#middleitem").click(function(){
});

$("#rightitem").click(function(){
});


let allowedSearch = true;
let db = "CA"

function search(){
    if(allowedSearch){
        $(".search-box").empty();
        $(".page-numbers").empty();
        let search = $("#searchInput").val().toLocaleLowerCase().trim();
        if(search.length != 0){
            let vh = parseInt($(window).height())* 0.50;
           $.ajax({
                type: 'get',
                url: '/search' + db,
                data: {
                    search: search,
                }
            }).done(function (data) {
               data = JSON.parse(data);
               if(data.length != 0){
                   if (data.length >= 5){
                       pages = Math.floor(data.length/5) + data.length % 5
                   }
                   else{
                       pages = 1
                   }
                   for (let i = 1; i <= pages; i++){
                       $(".page-numbers").append("<div><span>"+ i +"<span></div>");
                   }
                   for (let i = 0; i < data.length; i++){
                    $(".search-box").append("<div class='search-result-template' id =" + i +"><h3>" +data[i][0] + "</h3><p "+ i + ">" +data[i][1] +"</p></div>");
                    let stringID = "#" + i
                   vh+=parseInt($(stringID).height() + 8);
                    allowedSearch = true;
                }
                   $( ".search" ).animate({height: vh }, 1100);
                   $(".search-area").css("height",vh - 2 * parseInt($(".search-area").css("top")));
                   $(".search-box").css("height",vh - 2 * parseInt($(".search-area").css("top")));
                   $("html, body").animate({ scrollTop: $(document).height() }, 1500);


                
                   
               }
               
               else{
                   $( ".search" ).animate({  height: "52vh" }, 1100 );
                   $("html, body").animate({ scrollTop: $(document).height() }, 1100).promise().then(function(){                                       
                       $(".search-box").append(" <div class='search-result-template'><h3>Nothing found</h3><p></p></div>");                                    
                       $(".search-area").css("height",vh - 2 * parseInt($(".search-area").css("top")));
                       $(".search-box").css("height",vh - 2 * parseInt($(".search-area").css("top")));
                       allowedSearch = true;
                   });
               }
           });
        }
    }
};

//implement pages

$("#submitSearch").click(function(){
    search();
    allowedSearch = false;
});

$("#searchInput").keyup(function(event){
    if(event.keyCode == 13){
        search();
        allowedSearch = false;
    }
});

$('#searchInput').on('input', function(e) {
    if('' == this.value) {
        $(".search-box").empty();
        $(".page-numbers").empty();
        $(".search-box").css("height","20vh");
        $( ".search" ).animate({  height: "50vh" }, 1100 );
    }
});

$("#UKDB").click(function(){
    db = "UK";
    $("#UKDB").css("border-bottom","1px solid black");
    $("#CADB").css("border-bottom"," none");
})

$("#CADB").click(function(){
    db = "CA";
    $("#CADB").css("border-bottom","1px solid black");
    $("#UKDB").css("border-bottom","");

})