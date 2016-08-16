categories = ['Lifestyle', 'Tech', 'Food', 'Fashion', 'Travel']

function Popular(){
    $.ajax({
        type: 'get',
        url: '/popular' + db
    }).done(function(data){
        data = JSON.parse(data);
        
        for (var i = 0; i < data.length; i++){
            $("#pti"+data[i][0][2]).find("h4").text(data[i][0][0]);
            $("#pti"+data[i][0][2]).find("p").text(data[i][0][1]);
        }
        
    })
}


window.onload = function(){
    Popular();
};





