/* Variabelen */


/* Functions */
function maakListItem(feature){
    var eUlist          =  document.querySelector('#ulist');
    var eListItem       =  document.createElement('li');
    eUlist.appendChild(eListItem);
    eListItem.id           =  feature;
    eUlist.querySelector('#'+feature).innerHTML =   feature;
}

window.onload = function () {

    // maak nieuwe ul#ulist aan
    var eContainer   =  document.querySelector(".container");
    var eUlist       =  document.createElement('ul');
    eUlist.id        =  "ulist";
    eContainer.appendChild(eUlist);

    /* Feature Sensing/detection */
    // document.images
    var feature     =   "document_images"
    maakListItem(feature);
    if ('images' in document) {


    }
    else {

    }

};



