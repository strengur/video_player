// Variables
  var $myVideo = document.getElementsByTagName("video")[0];
  //var $cccc = document.getElementsByClassName('video-content-and-control');
  var $playPauseButton = document.getElementById('play-pause');
  var $sizeScreenButton = document.getElementById('full-screen');
  var $muteButton = document.getElementById('mute');
  var $volumeDownButton = document.getElementById('volume-down');
  var $volumeUpButton = document.getElementById('volume-up');
  var $muteButton = document.getElementById('mute');
  var $captionTextControl = document.getElementById('caption-text-control');
  var $timeLine = document.getElementById('progressBar');
  var $timeBubble = document.getElementById('timeOnProgressBar');
  var $currentTime = $myVideo.currentTime;
  var $duration = $myVideo.duration;
  var $playbackNormal = document.getElementById('playback-normal');
  var $playbackFast = document.getElementById('playback-fast');
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

  document.getElementById('current-time').innerHTML = "00:00";
  document.getElementById("duration").innerHTML = $totalDuration;

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
  document.getElementById('current-time').innerHTML = $currentPlayed;
}

function playedProgressBarFilling() {
  var $endBuf = $myVideo.currentTime;
  var $soFar = (($endBuf / $myVideo.duration) * 100);
  var $progressBar = document.getElementsByClassName('progress-bar-filling');
  $($progressBar).css('width', $soFar + '%');
}

$myVideo.addEventListener('progress', function() {
  var bufferedEnd = $myVideo.buffered.end($myVideo.buffered.length - 1);
  var duration =  $myVideo.duration;
  if (duration > 0) {
        document.getElementById('buffer-bar-filling').style.width = ((bufferedEnd / duration)*100) + "%";
  }
});

// BEGIN: Highlight bodytext as it is spoken.
  // Add caption text to object
    var $captionTextObject = new Object();
    for(var i = 0; i < $numberOfTextTracks; i++ ) {
      var $startOfTextTrack = $myVideo.textTracks[0].cues[i].startTime;
      var $textInTextTrack = $myVideo.textTracks[0].cues[i].text;
      $captionTextObject[$startOfTextTrack] = $textInTextTrack;
    }
  // Add caption time as array to be used to retrieve text from the object above.
    var $captionTextArray = new Array();
    for(var i = 0; i < $numberOfTextTracks; i++ ) {
      var $startOfTextTrack = $myVideo.textTracks[0].cues[i].startTime;
      $captionTextArray.push($startOfTextTrack);
    }

  // Function to make the bodytext highlight.
  function highlightText(x) {
      var $objectKey = $captionTextArray[x];
      $key = $captionTextObject[$objectKey];
      var $parag = $('#caption-texts p');

      var $rmlbr = $key.replace(/(\r\n|\n|\r)/gm," ");
      var $reg = new RegExp(($rmlbr), "igm");

      $parag.each(function() {
        var text = $(this).text().replace($reg, '<span class="caption-highlight">' + $rmlbr + '</span>');
        $(this).html(text);
      });
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

$('.video-content-and-control').mouseenter(function() {
  $('.video-controls').addClass('video-controls-show');
}).mouseleave(function() {
   $('.video-controls').removeClass('video-controls-show');
 });

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
});

$volumeUpButton.addEventListener('click', function() {
  var currentVolume = $myVideo.volume;
  $myVideo.volume += 0.1;
  if ($myVideo.volume >= 0.1) {
    $('#mute').attr('src', 'icons/volume-on-icon.png');
  }
});

$playbackNormal.addEventListener('click', function() {
  $myVideo.playbackRate = 1;
});

$playbackFast.addEventListener('click', function() {
  $myVideo.playbackRate = 1.5;
});

$captionTextControl.addEventListener('click', function() {
  if ($myVideo.textTracks[0].mode = "showing") {
    $myVideo.textTracks[0].mode = "disabled";
    $('#caption-text-control').attr('src', 'icons/caption-text-off.png');
  } else {
    $myVideo.textTracks[0].mode = "showing";
    $('#caption-text-control').attr('src', 'icons/caption-text.png');
  }
});

$sizeScreenButton.addEventListener('click', function() {
  $myVideo.webkitEnterFullScreen();
});
