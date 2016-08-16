
function displayCat(cat){
    $.ajax({
        type:"get",
        url:"/categoriesRet",
        data:{
            cat:cat,
            db:db,
        }
    }).done(function(data){
        window.location = data    
    });

}


$("#TechCat").click(function(){
    displayCat('Tech');
});

$("#FashionCat").click(function(){
    displayCat('Fashion');
});

$("#FoodCat").click(function(){
    displayCat('Food');
});

$("#TravelCat").click(function(){
    displayCat('Travel');
});

$("#LifestyleCat").click(function(){
    displayCat('Lifestyle');
});



$(".categoriesBox").hover(function(){
    $(this).find("i").css("color", "#7AC1AE");  
},function(){
    $(this).find("i").css("color", "#fff");
});
