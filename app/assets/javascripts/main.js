
  const overlayConfig = {
    glasses: {
      xscaleFactor: 1,
      yscaleFactor: 1,
      xOffset: 0,
      yOffset: 0
    },
    cat_face: {
      xscaleFactor: 1.5,
      yscaleFactor: 1.9,
      xOffset: -40,
      yOffset: -90
    },
    mustache: {
      xscaleFactor: 1,
      yscaleFactor: 1,
      xOffset: 0,
      yOffset: 50
    },
    mustache2: {
      xscaleFactor: 1.5,
      yscaleFactor: 2,
      xOffset: -50,
      yOffset: -90
    },
    reddog: {
      xscaleFactor: 1.5,
      yscaleFactor: 2,
      xOffset: -50,
      yOffset: -90
    },
    mona: {
      xscaleFactor: 2,
      yscaleFactor: 2,
      xOffset: 0,
      yOffset: -100
    },
    unicorn: {
      xscaleFactor: 1.5,
      yscaleFactor: 1.5,
      xOffset: 100,
      yOffset: -240
    }
  };
  const CANVAS_REFRESH_RATE = 16;


  $(document).ready(function() {
    // Elements for taking the snapshot i.e, copying the image into canvas
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var testcanvas = document.getElementById('testcanvas');
    var testctx = testcanvas.getContext('2d');
    var video = document.getElementById('video');


    $('#testcanvas').hide();
    $('.stickerbtn').hide();
    $('#addText').hide();
    $('#addFreeDraw').hide();



  if( $('body.snaps.new').length ){

    //Camera draining my battery.. set a timer for it!
    function setTimeOutForCamera(){
      timerCamera = setInterval(function () {
        video.pause();
        curr_stream.getVideoTracks()[0].stop();
        clearInterval(timerDrawOnCanvas);
      }, 50000);
    }


    var faceOverlay     = false;
    var filterEffects   = true;
    var textEffects     = false;
    var freeDrawEffects = false;
    var endGIF          = false;


      overlayEffects = new Image();

      $('.addOverlay').on('click', function() {
        overlayEffects.src = $(this).attr('src');
        const overlayName = $(this).data('name');
        overlayEffects.config = overlayConfig[ overlayName ];
        faceOverlay = true;
        console.log('this is ', this,overlayEffects.src )
      });





      // ======== sticker tab - unicar ========
      $('.sticker').on('click', function() {
        $('#testcanvas').show();
        $('#canvas').hide();
        var canvas_fabric =  new fabric.Canvas('testcanvas', {
          width: 640,
          height: 480,
        });
        data_url = document.getElementById('canvas').toDataURL();
        canvas_fabric.setBackgroundImage(data_url, canvas_fabric.renderAll.bind(canvas_fabric));


        fabric.Image.fromURL($(this).attr('src'), function(oImg) {
          // scale image down, and flip it, before adding it onto canvas
          oImg.scale(0.2);
          canvas_fabric.add(oImg);
          document.getElementById('download').addEventListener('click', function() {
              this.href = canvas_fabric.toDataURL();
              this.download = 'test.png';
          }, false);


          // Saving an image to database
          document.getElementById('save').addEventListener('click', function() {
          var imageData = canvas_fabric.toDataURL('image/png');
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
            window.location.href = "http://localhost:3000/snaps/";

          });


        });

      });//sticker.onclick

      $('#addText').on('click', function(){
        $('#testcanvas').show();
        $('#canvas').hide();
        var canvas_fabric =  new fabric.Canvas('testcanvas', {
          width: 640,
          height: 480,
        });
        data_url = document.getElementById('canvas').toDataURL();
        canvas_fabric.setBackgroundImage(data_url, canvas_fabric.renderAll.bind(canvas_fabric));

        function update(jscolor) {
            // 'jscolor' instance can be used as a string
            document.getElementByClass('upper-canvas').style.backgroundColor = '#' + jscolor
        }

        var fontColor = $('#font-color').val() || 'red'
        var fontSize = parseInt( $('#font-size').val() ) || 20;

         var text = new fabric.IText('Enter your text here', {
           width: 300,
           top: 240,
           left: 80,
           fontSize: fontSize,
           textAlign: 'center',
           fixedWidth: 150,
           fill: fontColor,
           fontFamily: 'Avenir'
         });

         canvas_fabric.add(text);
         document.getElementById('download').addEventListener('click', function() {
             this.href = canvas_fabric.toDataURL();
             this.download = 'test.png';
         }, false);

         // Saving an image to database
         document.getElementById('save').addEventListener('click', function() {
         var imageData = canvas_fabric.toDataURL('image/png');
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
           window.location.href = "http://localhost:3000/snaps/";

         });


       });


       // activate the brush (drawing mode is true)
           $('#addFreeDraw').on('click', function() {
             $('#testcanvas').show();
             $('#canvas').hide();

             var canvas_fabric =  new fabric.Canvas('testcanvas', {
               width: 640,
               height: 480,
             });
             data_url = document.getElementById('canvas').toDataURL();
             canvas_fabric.setBackgroundImage(data_url, canvas_fabric.renderAll.bind(canvas_fabric));

             canvas_fabric.isDrawingMode = true;
             // Use Pencil Brush for drawing
             canvas_fabric.freeDrawingBrush = new fabric['PencilBrush'](canvas_fabric);
             canvas_fabric.freeDrawingBrush.width = 10;
             canvas_fabric.freeDrawingBrush.color = '#005E7A';



             document.getElementById('download').addEventListener('click', function() {
                 this.href = canvas_fabric.toDataURL();
                 // debugger;
                 this.download = 'test.png';
             }, false);

             // Saving an image to database
             document.getElementById('save').addEventListener('click', function() {
             var imageData = canvas_fabric.toDataURL('image/png');
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
               window.location.href = "http://localhost:3000/snaps/";

             });


   });

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


               $('#filter-val-sepia').on('click', function() {
                 // set font color and size
                  var filter_val = parseInt( $('#filter-val-sepia').val() );
                  ctx.filter = "sepia("+ filter_val +"%)";

               });
               $('#filter-val-bw').on('click', function() {
                 // set font color and size
                  var filter_val_bw = $('#filter-val-bw').val();
                  ctx.filter = "grayscale("+ filter_val_bw +"%)";

               });
               $('#filter-val-mix').on('click', function() {
                 // set font color and size
                  var filter_val_mix = $('#filter-val-mix').val();
                  ctx.filter = "saturate("+ filter_val_mix +"%)";

               });
               // $('#addFreeDraw').on('click', function() {
               //  freeDrawEffects = !freeDrawEffects;
               // });



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
            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function(stream) {
                curr_stream = stream;
                video.src = window.URL.createObjectURL(stream);
                // video.play();
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
          ctx.lineWidth = 4;
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

      let timerToGetGifFrames;

      function createGIFs() {

        var encoder = new GIFEncoder();

        $('#endGif').on('click', function() {

         clearInterval(timerToGetGifFrames);
         encoder.finish();
         var binary_gif = encoder.stream().getData() //notice this is different from the as3gif package!
         var data_url = 'data:image/gif;base64,'+encode64(binary_gif);
         encoder.finish();
         encoder.download("download.gif");

         $('<img>', {src: data_url}).appendTo('#gifPreview');


         // Saving an image to database
         document.getElementById('save').addEventListener('click', function() {
         var imageData = canvas.toDataURL('image/png');
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
           window.location.href = "http://localhost:3000/snaps/";

         });

         $('').on('click', function () {
           window.location.href = "http://localhost:3000/snaps/";
         });

        });


        $('#addGif').on('click', function() {
          // console.log('addGifs');
          encoder.setRepeat(0); //0  -> loop forever
          encoder.setDelay(100); //go to next frame every n millisecond
          encoder.start();
          timerToGetGifFrames = setInterval( function () {
            encoder.addFrame(ctx);
          }, 100);

        })//$(addGifs)
      }//createGIFs

      function drawWebCamOnCanvas(){

       // timerDrawOnCanvas = setInterval( function () {
       const animate = function () {
           //Draw the webcam on canvas every 200ms -> now we have a live canvas on which we can draw
           ctx.drawImage(video, 0, 0, 640, 480);
           //Add the filters - all functionality for filters here

           // if(textEffects){
           // ctx.font = "10px Comic Sans MS";
           // ctx.fillText($("#addText").val(),100,100);
           // }

           if(faceOverlay){
             addOverlays();
           }


           // console.log('after trigger photo take!');
           timerDrawOnCanvas = requestAnimationFrame(animate);
         };
         // , CANVAS_REFRESH_RATE);
         // });

         animate();

      }//drawWebCamOnCanvas()




      function addOverlays() {


          var comp = ccv.detect_objects({
            "canvas" : (ccv.pre(canvas)),
            "cascade" : cascade,
            "interval" : 5,
            "min_neighbors" : 1
          });


            // Draw filters on everyone!
            for (var i = 0; i < comp.length; i++) {
              // Make custom changes to each specific overlay, if required
              const width = comp[i].width * overlayEffects.config.xscaleFactor;
              const height = comp[i].height * overlayEffects.config.yscaleFactor;
              const x = comp[i].x + overlayEffects.config.xOffset;
              const y = comp[i].y + overlayEffects.config.yOffset;

              ctx.drawImage(overlayEffects, x, y, width, height);
            // }
            }
          // });

    }




    document.getElementById('takesnapshot').addEventListener('click', function() {
      // clearInterval(timerDrawOnCanvas);
      cancelAnimationFrame(timerDrawOnCanvas);
      data_url = document.getElementById('canvas').toDataURL();
      $('.stickerbtn').show();
      $('#addText').show();
      $('#addFreeDraw').show();
      $('.overlaybutton').hide();
      $('#addFilter').hide();

      $('#testcanvas', {src: data_url}).appendTo('#gifPreview');

    });

  // Downloading an image to a computer
  // ID of the canvas and a sample filename.

    document.getElementById('download').addEventListener('click', function() {
        // e.preventDefault();
        this.href = document.getElementById('canvas').toDataURL();

        // debugger;
        // ($('#testcanvas').is(':visible'))
        // this.href = document.getElementById('testcanvas').toDataURL();

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
      window.location.href = "http://localhost:3000/snaps/";

    });







    document.onkeypress = function(e) {
        if (e.keyCode == 32) {

          setTimeout(function(){
          document.getElementById('download').href = document.getElementById('canvas').toDataURL();

          document.getElementById('download').click();
          alert('Your image is downloaded!')
          }, 3000);
        }
      };



  } // controller class match

});//doc ready
