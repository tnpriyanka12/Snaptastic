$(document).ready(function() {

  if( $('body.snaps.new').length ){

    //Camera draining my battery.. set a timer for it!
    function setTimeOutForCamera(){
      timerCamera = setInterval(function () {
        video.pause();
        curr_stream.getVideoTracks()[0].stop();
        clearInterval(timerDrawOnCanvas);
      }, 50000);
    }



    // Create an instance, which also creates a UI pane
    var gui = new dat.GUI();
    // My sample abject
      var filt = {
        sepia: 50
      };

      // sepia field
      gui.add(filt, 'sepia', 0, 100);
      // Listen to changes within the GUI
      gui.add(filt, "sepia").onChange(function(newValue) {
        console.log("Value changed to:  ", newValue);
      });



    var faceOverlay     = false;
    var filterEffects   = false;
    var textEffects     = false;
    var freeDrawEffects = false;
    var endGIF          = false;

      // Elements for taking the snapshot i.e, copying the image into canvas
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');
      var testcanvas = document.getElementById('canvas');
      var testctx = testcanvas.getContext('2d');
      var video = document.getElementById('video');

      overlayEffects = new Image()
      overlayEffects.src = "/assets/overlays/glasses.png";


        //temporary - to be removed
        //Camera draining my battery.. set a timer for it!
        setTimeOutForCamera();
        // Grab Camera/Video element, create settings, etc.
        getCamElements();
        // Draw Camera/Video element on Canvas
        drawWebCamOnCanvas();
        //Free Draw On canvas
        freeDrawOnCanvas();
        //CreateGIFs
        createGIFs();


               $('#addOverlay').on('click', function() {
                 faceOverlay = !faceOverlay;
               });

               $('#addFilter').on('click', function() {
                filterEffects = !filterEffects;
               });

               $('#addText').on('click', function() {
                textEffects = !textEffects;
               });

               $('#addFreeDraw').on('click', function() {
                freeDrawEffects = !freeDrawEffects;
               });



      function getCamElements(){
        // Grab Camera/Video element, create settings, etc.
        var video = document.getElementById('video');
        //Not showing the actual webcam window
        $('#video').hide();


        // Get access to the webcam!
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log('nav ready!');
            // { video & audio => true } since we only want video+audio
            //Stream object is the stream from users webcam -> so attach this as src of video tag
            //createObjectURL is used to create a new obj which is same type as stream
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(function(stream) {
                curr_stream = stream;
                video.src = window.URL.createObjectURL(stream);
                video.play();
             },
             function(err) {
              console.log("Unable to get video stream!")
             });
        }

      }//getCamElements



      function freeDrawOnCanvas(){
        var mouse = {x: 0, y: 0};
        var last_mouse = {x: 0, y: 0};

        /* Mouse Capturing Work */
          canvas.addEventListener('mousemove', function(e) {
              last_mouse.x = mouse.x;
              last_mouse.y = mouse.y;

              mouse.x = e.pageX - this.offsetLeft;
              mouse.y = e.pageY - this.offsetTop;
          }, false);

          /* Drawing on Paint App */
          ctx.lineWidth = 5;
          ctx.lineJoin = 'round';
          ctx.lineCap = 'round';
          ctx.strokeStyle = 'black';

          canvas.addEventListener('mousedown', function(e) {
            canvas.addEventListener('mousemove', onPaint, false);
          }, false);

          canvas.addEventListener('mouseup', function() {
              canvas.removeEventListener('mousemove', onPaint, false);
          }, false);

          var onPaint = function() {
              ctx.beginPath();
              ctx.moveTo(last_mouse.x, last_mouse.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.closePath();
              ctx.stroke();
          };
      }


      function createGIFs() {

        let TimerToGetGifFrames ;
        var encoder = new GIFEncoder();

        $('#endGif').on('click', function() {
         clearInterval(TimerToGetGifFrames);
         encoder.finish();
         var binary_gif = encoder.stream().getData() //notice this is different from the as3gif package!
         var data_url = 'data:image/gif;base64,'+encode64(binary_gif);
         encoder.finish();
         encoder.download("download.gif");
        });


        $('#addGifs').on('click', function() {

          encoder.setRepeat(3); //0  -> loop forever
          encoder.setDelay(500); //go to next frame every n millisecond
          encoder.start();
          TimerToGetGifFrames = setInterval( function () {
            encoder.addFrame(ctx);
          }, 200);


        })//$(addGifs)
      }//createGIFs

      function drawWebCamOnCanvas(){

       timerDrawOnCanvas = setInterval( function () {
           //Draw the webcam on canvas every 200ms -> now we have a live canvas on which we can draw
           ctx.drawImage(video, 0, 0, 640, 480);
           //Add the filters - all functionality for filters here

           if(textEffects){
           ctx.font = "10px Comic Sans MS";
           ctx.fillText("Hurray!!!!!",100,100);
           }

           if(faceOverlay){
             addOverlays();
           }

           if(filterEffects){
             addFilter()
           } else {
             removeFilter()
           }
           // console.log('after trigger photo take!');
         }, 100);
         // });

      }//drawWebCamOnCanvas()




      function addFilter(){
        ctx.filter = "sepia("+ filt.sepia +"%)";
      }

      function removeFilter(){
        ctx.filter = "none";
      }

      function addOverlays() {
          var comp = ccv.detect_objects({
            "canvas" : (ccv.pre(canvas)),
            "cascade" : cascade,
            "interval" : 5,
            "min_neighbors" : 1
          });
          // console.log('Found Faces', comp.length);

          // console.log(comp[0].x, comp[0].y);
          // console.log(comp[0].x + 200.0, comp[0].y + 200.0);
            // if(comp.length <= 0)
            // return;

            // Draw filters on everyone!
            for (var i = 0; i < comp.length; i++) {
              ctx.drawImage(overlayEffects, comp[i].x, comp[i].y,comp[i].width, comp[i].height);
            }
          // });

    }




    document.getElementById('snapshot').addEventListener('click', function() {
      clearInterval(timerDrawOnCanvas);
    });

  // Downloading an image to a computer
  // ID of the canvas and a sample filename.

    document.getElementById('download').addEventListener('click', function() {
        // e.preventDefault();
        this.href = document.getElementById('canvas').toDataURL();
        this.download = 'test.png';
    }, false);


    // Saving an image to database
    document.getElementById('save').addEventListener('click', function() {
    var imageData = document.getElementById('canvas').toDataURL('image/png');
      // console.log(imageData);
      $.ajax({
        url: '/snaps',
        method: 'post',
        dataType: 'json',
        data: {
          snap: imageData
        }
      })
      .done(function (data) {
        console.log('Successfull AJAX Request', data);
        // Once successful request is done, redirect user to the Profile page
      })
      .fail(function () {
        console.log('Failed AJAX Request!');
      });

    });




  } // controller class match

});//doc ready
