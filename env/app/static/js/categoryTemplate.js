let PagesArray = [];

window.onload = function(){
    let elements = $(".page-numbers").find("TD");
    let tableRowsShown = $("table").find(".RowContainer");
    let tableRows = $("table").find(".RowContainerHidden");
    let DIVS = $(".MainTable").find("TD")
        
    for (let i=0; i<DIVS.length;i++){
        if ($(DIVS[i]).find("h4").text() == "" && $(DIVS[i]).find("p").text() == ""){
            $(DIVS[i]).css("background-color","transparent")
            $($(DIVS[i]).find("h4")).css("border","none")
        }
    }
    
    
    for (let i=tableRowsShown.length-1; i>-1;i--){        
        tableRows.splice(0,0,tableRowsShown[i]);
    }
    
    let NumberPages = Math.ceil(tableRows.length/2);
    let PA = []
    let key = 0;
    
    for(let i=0; i < NumberPages; i++){
        PA.push([]);
    }
    
    for (let i=1; i<=tableRows.length; i++){
        PA[key].push(tableRows[i-1]);
        
        if (i%2==0){
            key++
        }
    }
    
    PagesArray = PA
             
    for (let i=1; i<= elements.length; i++){
        $(elements[i-1]).attr("id",i+"catPage");
    }
}

$(".page-numbers").find("TD").click(function(){
    let index = $(this).attr("id")[0]-1;
    
    for(let i=0; i<$(".page-numbers").find("TD").length;i++){
        $($(".page-numbers").find("TD")).css("border","none");
    }
    $($(".page-numbers").find("TD")[index]).css("border","1px solid black");
    
    for (let i=0; i<PagesArray.length;i++){
        for(let j=0;j<PagesArray[i].length;j++){
            $(PagesArray[i][j]).css("display","none");
        }
    }
    
    for(let i=0; i<PagesArray[index].length;i++){
        $(PagesArray[index][i]).css("display","flex")
    }
});

$(".ICON").click(function(){
    window.history.back();
});













