var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('scan').addEventListener('click', this.scan, false);
        document.getElementById('encode').addEventListener('click', this.encode, false);
    },

    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
        app.receivedEvent('deviceready');     
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');


        // window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
        // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onInitFs, errorHandler);   

        console.log('Received Event: ' + id);
    },

    scan: function() {
        
        //console.log('scanning');
        
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.scan( function (result) { 

            // alert("We got a barcode\n" + 
            // "Result: " + result.text + "\n" + 
            // "Format: " + result.format + "\n" + 
            // "Cancelled: " + result.cancelled); 

            d3.csv("data/bars.csv", function(data) {
                data.forEach(function (d, i) {
                    if (d.bar_code === result.text) {
                        alert("Result: " + d.bar_code + "\n" + d.cijena.split("=")[0]);
                    } else if (i + 1 === data.length) {
                        //alert("Barkod " + result.text + " nije pronađen");
                        alert("cordova.file.dataDirectory");
                        
                    }

                })
            });




           // console.log("Scanner result: \n" +
           //      "text: " + result.text + "\n" +
           //      "format: " + result.format + "\n" +
           //      "cancelled: " + result.cancelled + "\n");

            // document.getElementById("info").innerHTML = result.text;


            //console.log(result);
            /*
            if (args.format == "QR_CODE") {
                window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
            }
            */

        }, function (error) { 
            console.log("Scanning failed: ", error); 
        } );
    },

    encode: function() {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.encode(scanner.Encode.TEXT_TYPE, "http://www.nhl.com", function(success) {
            alert("encode success: " + success);
          }, function(fail) {
            alert("encoding failed: " + fail);
          }
        );

    }

};



// function onInitFs(fs) {

//     //var fileURL = "cdvfile://localhost/persistent/file.png";
//     var fileURL = "file://localhost/persistent/file.png";
//                     //file://localhost/persistent/DCIM/Camera/1395167011485.jpg

//     var fileTransfer = new FileTransfer();
//     var uri = encodeURI("http://upload.wikimedia.org/wikipedia/commons/6/64/Gnu_meditate_levitate.png
//         ");

//     fileTransfer.download(
//             uri,
//             fileURL,
//             function(entry) {
//                 console.log("download complete: " + entry.fullPath);
//             },
//             function(error) {
//                 console.log("download error source " + error.source);
//                 console.log("download error target " + error.target);
//                 console.log("upload error code" + error.code);
//             },
//             false,
//             {
//                 headers: {
//                     "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
//                 }
//             }
//     );
// }


/*
TO DO:
* load externally "bars.csv"
* save to file podaci.txt

*/
