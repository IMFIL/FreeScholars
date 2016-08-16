
$("#leftitem").click(function(){
    $('html, body').animate({
        scrollTop: $(".search").offset().top
    }, 1000);
});

$("#middleitem").click(function(){
    $('html, body').animate({
        scrollTop: $(".popular").offset().top
    }, 1000);
});

$("#rightitem").click(function(){
    $('html, body').animate({
        scrollTop: $(".categories").offset().top
    }, 1000);
});


let allowedSearch = true;
let db = "CA"
let searchHits = 0;
let InitialSearchH = parseInt($(".search").css("height"));

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
                   pages = Math.ceil(data.length/5)
                   searchHits = pages;
                   let width = 0;
                   for (let i = 1; i <= pages; i++){
                       $(".page-numbers").append("<div class='pages' id=" + i +"div" +"><span id=" +i +"span"+">"+ i +"<span></div>");
                       
                       if (i == 1){
                           $("#1div").css("border","1px black solid");
                       }
                       
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
                   $( ".search" ).animate({height: InitialSearchH + parseInt($(".search-box-holder").css("height")) }, 1100);
                   allowedSearch = true;
               }
               else{
                   $( ".search" ).animate({  height: "52vh" }, 1100 );
                   $(".search-box-holder").append("<div class='search-box'> <div class='search-result-template'><h3>Nothing found</h3><p></p></div> </div>");
                   allowedSearch = true;
               }
           });
        }
    }
};


$("#submitSearch").click(function(){
    if($("#searchInput").val().toLocaleLowerCase().trim().length >= 3){
        search();
        allowedSearch = false;
    }
    else{
        alert("Search needs to be at least 3 characters long")
    }
});

$("#searchInput").keyup(function(event){
    if(event.keyCode == 13){
        if($("#searchInput").val().toLocaleLowerCase().trim().length >= 3){
            search();
            allowedSearch = false;
        }
        else{
            alert("Search needs to be at least 3 characters long")
        }
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
        $( ".search" ).animate({  height: InitialSearchH }, 1100 );
    }
});

$("#UKDB").click(function(){
    db = "UK";
    $("#UKDB").css("border-bottom","1px solid white");
    $("#CADB").css("border-bottom"," none");
    Popular();
});

$("#CADB").click(function(){
    db = "CA";
    $("#CADB").css("border-bottom","1px solid white");
    $("#UKDB").css("border-bottom","");
    Popular();
});

 $('.page-numbers').on('click','div',function(){ 
    for(let i=1; i<=searchHits;i++){
        if (i == $(this).find("span").text()){
            $("#"+i+"page").show();
            $(this).css("border", "1px black solid");
           $( ".search" ).animate({height: InitialSearchH + parseInt($("#"+i+"page").css("height"))}, 1100);
        }
        else{
            $("#" + i + "div").css("border", "none");
            $("#"+i+"page").hide();
        }
    }
});