// Variables
  var $myVideo = document.getElementsByTagName("video")[0];
  //var $cccc = document.getElementsByClassName('video-content-and-control');
  var $playPauseButton = document.getElementById('play-pause');
  var $sizeScreenButton = document.getElementById('full-screen');
  var $muteButton = document.getElementById('mute');
  var $volumeDownButton = document.getElementById('volume-down');
  var $volumeUpButton = document.getElementById('volume-up');
  var $muteButton = document.getElementById('mute');
  var $timeLine = document.getElementById('progressBar');
  var $timeBubble = document.getElementById('timeOnProgressBar');
  var $currentTime = $myVideo.currentTime;
  var $duration = $myVideo.duration;
  var $volumeChange;
  var x = 0;
  var $numberOfTextTracks = $myVideo.textTracks[0].cues.length; // How many caption texts there are

// BEGIN: Transform seconds from video to min:sec format
  function transformSeconds($e) {
    var $minutes = Math.floor($e / 60);
    var $seconds = $e - $minutes * 60;

    return [$minutes, $seconds];
  }

  var $durationTotal = transformSeconds($duration);
// END: Transform seconds from video to min:sec format

// BEGIN: Check to see if sec and/or min is two digit or not and if not, add leading cero to the time.
  function ceroLeft(string,pad,length) {
    if (string.toString().length !== 2) {
      return (new Array(length+1).join(pad)+string);
    } else {
    return (new Array(length).join(pad)+string);
    }
  }
  // END: Check to see if sec and/or min is two digit or not and if not, add leading cero to the time.

  var $totalDuration = ceroLeft($durationTotal[0],'0',1) + ':' + ceroLeft(Math.round($durationTotal[1]),'0', 1);

  document.getElementById('currentTime').innerHTML = "00:00";
  document.getElementById("duration").innerHTML = $totalDuration;

// BEGIN: Current playing time.
  $myVideo.ontimeupdate = function() {
    videoCurrentTime();
    playedProgressBarFilling();


    // Function to highlight bodytext
    if (Math.round($captionTextArray[x]) === Math.round($myVideo.currentTime)) {
      x++;
      highlightText((x-1));
    }

  };

function videoCurrentTime() {
  var $currentPlay = transformSeconds($myVideo.currentTime);
  var $currentPlayed = ceroLeft($currentPlay[0],'0',1) + ':' + ceroLeft(Math.round($currentPlay[1]),'0', 1);
  document.getElementById('currentTime').innerHTML = $currentPlayed;
}
// END: Current playing time.

function playedProgressBarFilling() {
  var $endBuf = $myVideo.currentTime;
  var $soFar = (($endBuf / $myVideo.duration) * 0.25 * 400);
  var $progressBar = document.getElementsByClassName('progressBarFilling');
  $($progressBar).css('width', $soFar + '%');

  //$($timeBubble).css('left', ($soFar-2) + '%');
}

// BEGIN: Highlight bodytext as it is spoken.
  // Add caption text to object
    var $captionTextObject = new Object();
    for(var i = 0; i < $numberOfTextTracks; i++ ) {
      var $startOfTextTrack = $myVideo.textTracks[0].cues[i].startTime;
      var $textInTextTrack = $myVideo.textTracks[0].cues[i].text;
      $captionTextObject[$startOfTextTrack] = $textInTextTrack;
    }

    var $captionTextArray = new Array();
    for(var i = 0; i < $numberOfTextTracks; i++ ) {
      var $startOfTextTrack = $myVideo.textTracks[0].cues[i].startTime;
      //var $textInTextTrack = $myVideo.textTracks[0].cues[i].text;
      $captionTextArray.push($startOfTextTrack);
    }

  // Function to make the bodytext highlight.
  function highlightText(x) {

        var objectKey = $captionTextArray[x];
        var key = $captionTextObject[objectKey];
        var $parag = document.getElementById('captionTexts');
        console.log('Iffy: ', x);
        console.log($captionTextArray[x]);
        console.log('Key: ',key);
        var str = key;
        var highlighted = str.replace(key, '<span class="red">', key, '</span>');
        document.getElementById('captionTexts').innerHTML('key');
      // Add CC text to Object with time as key
  }
// END: Function to highlight bodytext as it is spoken.

function videoVolume($volumeChange) {
  console.log($volumeChange);
}

  var screenSize = function() {

  }

  var soundOnOff = function() {

  }

// Event listeners

$timeLine.addEventListener('mousemove', function() {
  var $locationOnBar = event.pageX;
  var $locationToPerc = $locationOnBar / Math.round($timeLine.offsetWidth) * 100 -2;
  var $durationOnBar = $locationOnBar / Math.round($timeLine.offsetWidth) * $duration -1.5;
  var $durationTotal = transformSeconds($durationOnBar);
  var $bubbleTime = ceroLeft($durationTotal[0],'0',1) + ':' + ceroLeft(Math.round($durationTotal[1]),'0', 1);

  document.getElementById('timeOnProgressBar').innerHTML = $bubbleTime;
  $($timeBubble).css('display', 'block');
  $($timeBubble).css('left', ($locationToPerc-2) + '%');
  $timeLine.addEventListener('click', function() {
    $myVideo.currentTime = $durationOnBar;
  });
});

$timeLine.addEventListener('mouseleave', function() {
  $($timeBubble).css('display', 'none');
})

// $('.video-content-and-control').mouseenter(function() {
//   $('.video-controls').css('top', '-24px');
// }).mouseleave(function() {
//    $('.video-controls').css('top', '29px');
//  });

$playPauseButton.addEventListener('click', function() {
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

$sizeScreenButton.addEventListener('click', function() {
  $myVideo.webkitEnterFullScreen();
});
