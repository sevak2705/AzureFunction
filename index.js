var base64 = require('base-64');
module.exports = async function (context, myBlob) {
    context.log("JavaScript blob trigger function processed blob \n Name:", context.bindingData.name, "\n Blob Size:", myBlob.length, "Bytes");

    var contractObj = {
        "id": "",
        "type": "contract",
        "pages": []
        
    }
    contractObj.id = base64.encode(context.bindingData.name);  //ID
 
    // need to convert pdf to image
    // and upload to processedImage blob
    context.bindings.processedImage = myBlob; //copy pdf from one blob to another.

    // fill imageUrl 
    var items = {
        'id' : contractObj.id,
        'imageUrl' : [
            'https://wbcrscldevstd1.blob.core.windows.net/processed-vendor-contract/IMG_1.jpg',
            'https://wbcrscldevstd1.blob.core.windows.net/processed-vendor-contract/slide5new.jpg'
        ]
    };
    items.imageUrl.forEach(function (o, p) {
        contractObj.pages.push(o);
      });
      context.bindings.outputQueue = contractObj;
      context.log('Queue items -->' + JSON.stringify(context.bindings.outputQueue));
};