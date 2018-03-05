

//Camera draining my battery.. set a timer for it!
function setTimeOutForCamera(){
  timerCamera = setInterval(function () {
    video.pause();
    curr_stream.getVideoTracks()[0].stop();
    clearInterval(timerDrawOnCanvas);
  }, 50000);
}





$(document).ready(function() {
  // Elements for taking the snapshot i.e, copying the image into canvas
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var video = document.getElementById('video');

  filter = new Image()
  filter.src = "/assets/head1.png";


    //temporary - to be removed
    //Camera draining my battery.. set a timer for it!
    setTimeOutForCamera();
    // Grab Camera/Video element, create settings, etc.
    getCamElements();

    // Draw Camera/Video element on Canvas
      drawWebCamOnCanvas();




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


  function drawWebCamOnCanvas(){
     //??? This is added 'coz getContext('2d') triggering some error saying null element ???
     if (context == null){
       return;
     } else {

     timerDrawOnCanvas = setInterval( function () {
         //Draw the webcam on canvas every 200ms -> now we have a live canvas on which we can draw
         context.drawImage(video, 0, 0, 640, 480);
         //Add the filters - all functionality for filters here
         // $('#addfilter').on('click', function() {
           addFilter();
         // });

         console.log('after trigger photo take!');
         }, 200);
       // });
     }
  }//drawWebCamOnCanvas()

  function addFilter() {

      var comp = ccv.detect_objects({
        "canvas" : (ccv.pre(canvas)),
        "cascade" : cascade,
        "interval" : 5,
        "min_neighbors" : 1
      });
      console.log('Found Faces', comp.length);

      console.log(comp[0].x, comp[0].y);
        console.log(comp[0].x + 200.0, comp[0].y + 200.0);
        if(comp.length <= 0)
        return;

        // Draw filters on everyone!
        for (var i = 0; i < comp.length; i++) {
          context.drawImage(filter, comp[i].x, comp[i].y,comp[i].width, comp[i].height);
        }
      // });

}

});
