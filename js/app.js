// Variables
  var $myVideo = document.getElementsByTagName("video")[0];
  var $playPauseButton = document.getElementsByTagName('button')[0];
  var $sizeScreenButton = document.getElementById('screen-size');
  var $muteButton = document.getElementById('mute');
  var $volumeDownButton = document.getElementById('volume-down');
  var $volumeUpButton = document.getElementById('volume-up');
  var $muteButton = document.getElementById('mute');

  var $volumeChange;

// Functions

function videoVolume($volumeChange) {
  console.log($volumeChange);

}

  var screenSize = function() {

  }

  var soundOnOff = function() {

  }

// Event listeners


$playPauseButton.addEventListener("click", function() {
  if( $myVideo.paused ) {
    $myVideo.play();
  } else {
    $myVideo.pause();
  }
}, false);

$muteButton.addEventListener('click', function() {
  if( $myVideo.volume != 1) {
    $myVideo.volume = 1;
  } else {
    $myVideo.volume = 0;
  }
}, true);

$volumeDownButton.addEventListener('click', function() {
  var currentVolume = $myVideo.volume;
  $myVideo.volume -= 0.1;
} );

$volumeUpButton.addEventListener('click', function() {
  var currentVolume = $myVideo.volume;
  $myVideo.volume += 0.1;
} );
