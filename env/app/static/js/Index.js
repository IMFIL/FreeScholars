
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
        let search = $("#searchInput").val().toLocaleLowerCase().trim();
        if(search.length != 0){
           $.ajax({
                type: 'get',
                url: '/search' + db,
                data: {
                    search: search,
                }
            }).done(function (data) {
               data = JSON.parse(data);
               let len = 50 + data.length * 10;
               let vh = len.toString() + "vh";
               if(data.length != 0){
                   $( ".search" ).animate({height: vh }, 1100 );
                   $("html, body").animate({ scrollTop: $(document).height() }, 1100).promise().then(function(){
                       for (let i = 0; i < data.length; i++){
                            $(".search-box").append("<div class='search-result-template'><h3 id =" + i + ">" +data[i][0] + "</h3><p "+ i + ">" +data[i][1] +"</p></div>"); 
                           allowedSearch = true;

                       }
                   });
               }
               else{
                   $( ".search" ).animate({  height: "52vh" }, 1100 );
                   $("html, body").animate({ scrollTop: $(document).height() }, 1100).promise().then(function(){                                       
                       $(".search-box").append(" <div class='search-result-template'><h3>Nothing found</h3><p></p></div>");
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