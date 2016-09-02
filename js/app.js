document.addEventListener("DOMContentLoaded", function() {
  hideControls();
}, false);

var $mediaPlayer = document.getElementById('the-player');

function hideControls() {
  $mediaPlayer.controls = false;
}

function showControls() {
  $mediaPlayer.controls = true;
}

$mediaPlayer.onmouseover = function() {
  showControls();
};

$mediaPlayer.onmouseout = function() {
  hideControls();
};

var $subTextsArray = [];
var $obj = {};
var $key = "";
var $value = "";
function subText() {
  for (var i = 0; i < $mediaPlayer.textTracks[0].cues.length; i++) {
    //Array with all subtitle
    $subTextsArray.push($mediaPlayer.textTracks[0].cues[i].text.replace(/[\n\r]/g, ' '));

    //Object with time as key and subtitle as value
    $key = $mediaPlayer.textTracks[0].cues[i].startTime;
    $value = $mediaPlayer.textTracks[0].cues[i].text.replace(/[\n\r]/g, ' ');
    $obj[$key] = $value;
  }
};

// function matchSubtitle() {
//   console.log($mediaPlayer.currentTime);
//   //return;
// }
//
// $mediaPlayer.onplaying = matchSubtitle;

$(document).ready(function(){
  $('video').bind('timeupdate',function(){
    var current_time = $('video')[0].currentTime;
    console.log(parseInt(current_time));
    $('.caption').html(parseInt(current_time));
  });
});


//=================================================

function playPauseVideo() {
  if ($mediaPlayer.paused) {
    $mediaPlayer.play();
    $mediaPlayer.addEventListener('progress', playedProgressBarFilling);
  } else {
    $mediaPlayer.pause();
  }
}

function playedProgressBarFilling() {
  //var myVideo = document.getElementsByTagName('video')[0];
  var endBuf = $('video')[0].currentTime;
  var soFar = ((endBuf / $mediaPlayer.duration) * 100 + 1);
  var $progressBar = document.getElementsByClassName('progressBarFilling');
  $($progressBar).css('width', soFar + '%');
  document.getElementById("loadStatus").innerHTML =  soFar + '%';
}


function addMyListeners(){
   var myVideo = document.getElementsByTagName('video')[0];
   myVideo.addEventListener('progress', getPercentProg, false);
   myVideo.addEventListener('canplaythrough', myAutoPlay, false);
}

var playPauseButton = document.getElementById('play-pause');
console.log(playPauseButton);
playPauseButton.addEventListener('click', playPauseVideo);









function myAutoPlay() {
   var myVideo = document.getElementsByTagName('video')[0];
   myVideo.play();
}




function makeBig() {
   var myVideo = document.getElementsByTagName('video')[0];
   myVideo.height = myVideo.videoHeight * 2;
}

function makeNormal() {
   var myVideo = document.getElementsByTagName('video')[0];
   myVideo.height = myVideo.videoHeight;
}
