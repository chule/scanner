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
        document.getElementById('alert').addEventListener('click', this.alert, false);
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

    alert: function () {
        //alert("Root sustave je" + cordova.file.dataDirectory); //

        myFile1 = "myReadme.txt";

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

        function gotFS(fileSystem) {
            fileSystem.root.getFile(myFile1, {create: true, exclusive: false}, gotFileEntry, fail);
        }

        function gotFileEntry(fileEntry) {
            alert("good");                      
        }

        function fail(error) {
            alert("Error");
        }        
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
                        alert("Root sustave je\n " + cordova.file.dataDirectory);
                        
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

        alert("Root sustave je"); //
        onDeviceReady();

        // var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        // scanner.encode(scanner.Encode.TEXT_TYPE, "http://www.nhl.com", function(success) {
        //     alert("encode success: " + success);
        //   }, function(fail) {
        //     alert("encoding failed: " + fail);
        //   }
        // );

    }

};



function onDeviceReady() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

function gotFS(fileSystem) {
    fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, gotFileEntry, fail);
}

function gotFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
    writer.onwriteend = function(evt) {
        console.log("contents of file now 'some sample text'");
        writer.truncate(11);
        writer.onwriteend = function(evt) {
            console.log("contents of file now 'some sample'");
            writer.seek(4);
            writer.write(" different text");
            writer.onwriteend = function(evt){
                console.log("contents of file now 'some different text'");
            }
        };
    };
    writer.write("some sample text");
}

function fail(error) {
    console.log(error.code);
}





/*
TO DO:
* load externally "bars.csv"
* save to file podaci.txt

*/
