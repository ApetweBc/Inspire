window.onload = function (){
    // show spinner
        var spinnerModal = document.querySelector('#spinner-modal');
        spinnerModal.show();    

    var settings = {
        "url": "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline",
        "method": "GET",
        "timeout": 0,
        };
    $.ajax(settings)
    .done(function(result){
        sendData(result);
        let results = result;
        console.log(results);
     // we then pass the result to populate the list                     
    })
    .fail(function(xhr, status, error){
        console.log('error:' + xhr.status);
    // NOTE: normally we'd add some error handlers here
    }) 
    .always(function(){
    // done or fail we still hide the spinner
        spinnerModal.hide();
    })   

    function sendData(jsonData){

        var itemsList = document.getElementById('list-item');
        for(let i = 0; i < jsonData.length; i++){                
            itemsList.appendChild(
                ons.createElement(
                    '<ons-card class="inside-cards">'+
                    '<ons-list>' +
         
                    '<ons-list-item modifier="tappable>' + 
                        '<div class="left" >' + 
                        '<img src="' + jsonData[i].image_link +'" class="product-images">' +
                        '</div>' +
                        '<div class="" style="margin-left:20px;" >' 
                            + jsonData[i].brand + "<br>"
                            + jsonData[i].price +  "<br>"
                            + jsonData[i].ratings + "<br>" +
                        '</div>' + 
                        '<div class="right">' + '<ons-list-item modifier="chevron" tappable onclick="pushJson(\'' + jsonData[i].brand + '\')" ></ons-list-item>' + '</div>'+
                        '<div>' +
                        // '<ons-button onclick="pushJson(\'' + jsonData[i].brand + '\')" icon="md-caret-right"></ons-button>' +
                        '</div>' +
                    '</ons-list-item>' +
                    '</ons-list>' +
                    '</ons-card>'
                )
            );
        }
    }

}

var GetItems = document.getElementById('makeupList');

function pushJson(item){    

   document.querySelector('#myNavigator').pushPage('makeup', {data: {item: item}}); 

} 

document.addEventListener('init', function(event){
    var page = event.target;
    if (page.id == 'makeup-page'){
        page.querySelector('#makeupList').innerHTML = page.data.item;
    }
});




