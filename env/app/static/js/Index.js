
$("#leftitem").click(function(){
});

$("#middleitem").click(function(){
});

$("#rightitem").click(function(){
});


let allowedSearch = true;
let db = "CA"
let searchHits = 0;

function search(){
    if(allowedSearch){
        searchHits = 0;
        $(".search-box").empty();
        $(".page-numbers").empty();
        $(".search-box-holder").empty();
        $(".search").css("height","");
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
                   let CurrentPage = 1;
                   let searchBoxes = [];                                      
                   if (data.length >= 5){
                       if(data.length%5 != 0){
                        pages = Math.floor(data.length/5) + 1;
                       }
                       else{
                           pages = data.length/5;
                       }
                   }
                   else{
                       pages = 1;
                   }
                   searchHits = pages;
                   let width = 0;
                   for (let i = 1; i <= pages; i++){
                       $(".page-numbers").append("<div class='pages'><span id=" +i +"span"+">"+ i +"<span></div>");
                       width += parseInt($(".pages").css("width"));
                   }
                   $(".page-numbers").css("width",width);
                   for (let i = 1; i <= data.length; i++){
                       searchBoxes.push("<div class='search-result-template' id =" + i +"><h3>" +data[i-1][0] + "</h3><p "+ i + ">" +data[i-1][1] +"</p></div>");
            
                       if (i % 5 == 0){
                           let selector = "none";
                           if (CurrentPage == 1){
                               selector = "";
                           }
                           let htmlString = '';
                           for(let j = 0; j < searchBoxes.length;j++){
                               htmlString += searchBoxes[j];
                           }
                           $(".search-box-holder").append("<div class='search-box' id="+CurrentPage+'page'+">"+htmlString+"</div>")
                           $("#"+CurrentPage +"page").css("display",selector);
                           searchBoxes = [];
                           CurrentPage++;
                       }
                       
                       if (i == data.length  && i % 5 != 0){
                           let selector = "none";
                           if (CurrentPage == 1){
                               selector = "";
                           }
                           htmlString = '';
                           for(let j = 0; j < searchBoxes.length;j++){
                               htmlString += searchBoxes[j];
                           }
                           $(".search-box-holder").append("<div class='search-box' id="+CurrentPage+ 'page'+">"+htmlString+"</div>")
                           $("#"+CurrentPage +"page").css("display",selector);
                       }
                }
                   $( ".search" ).animate({height: parseInt($(".search").css("height")) + parseInt($(".search-box-holder").css("height")) }, 1100);
                   allowedSearch = true;
               }
               else{
                   $( ".search" ).animate({  height: "52vh" }, 1100 );
                   $("html, body").animate({ scrollTop: $(document).height() }, 1100).promise().then(function(){
                   $(".search-box-holder").append("<div class='search-box'> <div class='search-result-template'><h3>Nothing found</h3><p></p></div> </div>");
                    allowedSearch = true;
                   });
               }
           });
        }
    }
};


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
        $(".search-box-holder").empty();
        $(".page-numbers").css("width",0);
        $(".search-box").css("height","0");
        $(".search-area").css("height","0");
        $( ".search" ).animate({  height: "50vh" }, 1100 );
    }
});

$("#UKDB").click(function(){
    db = "UK";
    $("#UKDB").css("border-bottom","1px solid white");
    $("#CADB").css("border-bottom"," none");
});

$("#CADB").click(function(){
    db = "CA";
    $("#CADB").css("border-bottom","1px solid white");
    $("#UKDB").css("border-bottom","");

});

 $('.page-numbers').on('click','div',function(){ 
    for(let i=1; i<=searchHits;i++){
        if (i == $(this).find("span").text()){
            $("#"+i+"page").show();
            $( ".search" ).animate({height: 0.8*parseInt($(".search-box-holder").css("height"))  + parseInt($(".search-box-holder").css("height")) }, 1100);
        }
        else{
            $("#"+i+"page").hide();
        }
    }
});