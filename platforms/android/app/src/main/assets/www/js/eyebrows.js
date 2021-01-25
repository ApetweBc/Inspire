window.onload = function (){
    // show spinner
        var spinnerModal = document.querySelector('#spinner-modal');
        spinnerModal.show();    

    var settings = {
        "url": "http://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyebrow",
        "method": "GET",
        "timeout": 0,
        };
    $.ajax(settings)
    .done(function(result){
        sendData(result);
        
        let results = result;
        // console.log(results);
     // we then pass the result to populate the list                     
    })
    .fail(function(xhr, status, error){
        // console.log('error:' + xhr.status);
    // NOTE: normally we'd add some error handlers here
    }) 
    .always(function(){
    // done or fail we still hide the spinner
        spinnerModal.hide();
    })   

    function sendData(jsonData){
        
        var itemsList = document.getElementById('list-item');
        for(let i = 0; i < jsonData.length; i++){   
            var category =  jsonData[i].category ?? "Not Available";              
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
                            // + jsonData[i].name + "<br>"
                            +  "$ " + jsonData[i].price +  "<br>"
                            + category + "<br>" +
                        '</div>' + 
                        '<div class="right">' + '<ons-list-item modifier="chevron" tappable onclick="pushJson(\'' + jsonData[i].brand + '\' , \'' + jsonData[i].category + '\', \'' + jsonData[i].id + '\')" ></ons-list-item>' + '</div>'+
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

function pushJson(item, item2, item3){    

   document.querySelector('#myNavigator').pushPage('makeup', {data: {item: item, category: item2, overview: item3 }}); 

} 


document.addEventListener('init', function(){
   
    var page = document.getElementById('makeup-page');
    if(page.id === 'makeup-page'){
                        
        var slug1 = page.data.item;
        var slug2 = page.data.category;
        // console.log(slug);
    }
   
    var spinnerModal = document.querySelector('#spinner-modal');
    spinnerModal.show();    
    var uriBrand = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=";
    var uriProductTpe = "&product_category=";
    var productCategory;

var settings = {
    "url": uriBrand + slug1 + uriProductTpe + slug2,
    "method": "GET",
    "timeout": 0,
    };
$.ajax(settings)
.done(function(result){
    // sendData(result);
    description(result);
    let results = result;
    // console.log(results);
 // we then pass the result to populate the list                     
})
.fail(function(xhr, status, error){
    // console.log('error:' + xhr.status);
// NOTE: normally we'd add some error handlers here
}) 
.always(function(){
// done or fail we still hide the spinner
    spinnerModal.hide();
})   

});

function description (jsonData){
var MoreItems = document.getElementById('description');
    for(let i = 0; i < jsonData.length; i++){
       MoreItems.appendChild(
        ons.createElement (
           "<div style='margin: 20px 0;'>" +
               '<img src="' + jsonData[i].image_link +'" class="product-images">' 
                            + jsonData[i].brand + "<br>"
                            + jsonData[i].name + "<br>"
                            +  "$ " + jsonData[i].price +  "<br>"
                            + jsonData[i].category + "<br>" 
                            + '<a href="' + jsonData[i].product_link + '" >' + "Buy Now" + '</>' +
                            
           
           "</div>"
       ) 
       );   
    }

}

// Overview


document.addEventListener('init', function(){

    var page = document.getElementById('makeup-page');
    if(page.id === 'makeup-page'){    
        var slug3 = page.data.overview;
        // console.log(slug3);
    }
   
    var spinnerModal = document.querySelector('#spinner-modal');
    spinnerModal.show();    
    var uriMain = "http://makeup-api.herokuapp.com/api/v1/products/";
    var uriId = ".json";
   

var settings = {
    "url": uriMain + slug3 + uriId,
    "method": "GET",
    "timeout": 0,
    };
$.ajax(settings)
.done(function(result){
    // sendData(result);
    overview(result);
    let results = result;
    // console.log(results);
 // we then pass the result to populate the list                     
})
.fail(function(xhr, status, error){
    // console.log('error:' + xhr.status);
// NOTE: normally we'd add some error handlers here
}) 
.always(function(){
// done or fail we still hide the spinner
    spinnerModal.hide();
})   

});



function overview (jsonData){
    var OverViewItems = document.getElementById('makeupList');
           OverViewItems.appendChild(
            ons.createElement (
               "<div style='margin: 20px 0;'>" +
                jsonData.name + "<br>" +
                   '<img src="' + jsonData.image_link +'" class="overview-images">' 
                                + jsonData.description + "<br>"
                                + '<div class="price">' 
                                + "Item Price: "
                                +  "$ " + jsonData.price +  "<br>"
                                + "Item Category: "
                                + jsonData.category + "<br>" 
                                + '<div class="button-buy">'
                                + '<a href="' + jsonData.product_link + '" >' + '<ons-button modifier="large">' + "Buy Now" + '</ons-button>'+ '</>'
                                + '</div>'
                                 + '</div>' +
                                '<hr>' +
               
               "</div>"
           ) 
           );   
    
    
    }
