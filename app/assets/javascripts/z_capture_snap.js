

$(document).ready(function() {

  console.log('doc ready!');
  glasses = new Image()
  glasses.src = "/assets/glasses.png";
    // Grab Camera/Video element, create settings, etc.
    var video = document.getElementById('video');
    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log('nav ready!');
        // { video & audio => true } since we only want video+audio
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function(stream) {
            curr_stream = stream;
            video.src = window.URL.createObjectURL(stream);
            video.play();
        });
    }

    // Elements for taking the snapshot i.e, copying the image into canvas
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    console.log('before trigger photo take!');

    //??? This is added 'coz getContext('2d') triggering some error saying null element ???
    if (context == null) {
      return;
    } else {
    // Snapshot capture taking place
    document.getElementById("snap").addEventListener("click", function() {
      //Snapshot taken i.e, contents from camera are drawn into canvas
    	context.drawImage(video, 0, 0, 640, 480);

    ////////For totally switching off the webcam - do it in the very end //////////
      // function vidOff() {
        // video.pause();
        // curr_stream.getVideoTracks()[0].stop();
      // }

      glasses.onload = function() {
        context.drawImage(glasses, 0, 0);
      };

      var comp = ccv.detect_objects({ "canvas" : (ccv.pre(canvas)),
      									"cascade" : cascade,
      									"interval" : 5,
      									"min_neighbors" : 1 });
                        console.log(comp)
                        // Draw glasses on everyone!
                        	// for (var i = 0; i < comp.length; i++) {
                        		context.drawImage(glasses, comp[0].x, comp[0].y,comp[0].width, comp[0].height);
                        	// }
      console.log('after trigger photo take!');

    });




    }

});
