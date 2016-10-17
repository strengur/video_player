// Variables
  var $myVideo = document.getElementsByTagName("video")[0];
  var $playPauseButton = document.getElementById('play-pause');
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

$(document).ready(function(){
  $('video').bind('timeupdate',function(){
    var $current_time = $('video')[0].currentTime;
    var $length_of_video = $('video')[0].duration;
    var $forwardSlash = " / ";
    console.log(parseFloat($current_time).toFixed(2));
    $('.time p').html(Math.ceil($current_time));
  });
});

$playPauseButton.addEventListener("click", function() {
  if( $myVideo.paused ) {
    $myVideo.play();
    $(this).attr('src', 'icons/pause-icon.png');
  } else {
    $myVideo.pause();
    $(this).attr('src', 'icons/play-icon.png');
  }
}, false);

$muteButton.addEventListener('click', function() {
  if( $myVideo.volume != 1) {
    $myVideo.volume = 1;
    $(this).attr('src', 'icons/volume-on-icon.png');
  } else {
    $myVideo.volume = 0;
    $(this).attr('src', 'icons/volume-off-icon.png');
  }
}, true);

$volumeDownButton.addEventListener('click', function() {
  var currentVolume = $myVideo.volume;
  $myVideo.volume -= 0.1;
  if ($myVideo.volume < 0.1) {
    $('#mute').attr('src', 'icons/volume-off-icon.png');
  }
} );

$volumeUpButton.addEventListener('click', function() {
  var currentVolume = $myVideo.volume;
  $myVideo.volume += 0.1;
  if ($myVideo.volume >= 0.1) {
    $('#mute').attr('src', 'icons/volume-on-icon.png');
  }
} );
