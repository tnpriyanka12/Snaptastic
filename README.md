# README
This README would normally document whatever steps are necessary to get the
application up and running.


### Cam details
Pure HTML5 Webcam features used.
Canvas used to draw out the image/video for snapshot/videoshot
Drawing out overlay image in the same canvas for effects


## Face detection Libraries
CCV.js
face.js
Detects the users eyes , nose mouth - function being used here detects the eye coordinates and puts an overlay starting from there.



##GEMS
gem 'pry-rails'
gem 'annotate'
gem 'jquery-rails'
gem 'cloudinary'


#######LIBRARIES
# Face Detection
ccv.js
face.js

# GIF Creation
GIFEncoder.js
LZWEncoder.js
NeuQuant.js

# Pasting and resizing overlays
Fabric.js

#GUI
Gui.js

# Face Distortions
jsmanipulate.js


##Filter in Rails Config
Added 'Rails.application.config.filter_parameters += [:snap]' to avoid the logging of HUGE binary file of the image

## Overlays/Masks
 Writing an existing image on canvas after detecting the facial co-ordinates of the user


## Filters & Texts
 Done using Canvas html5 features

##Gifs
