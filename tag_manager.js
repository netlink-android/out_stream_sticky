var head = document.querySelector("head");

var scriptElement = document.createElement("script");
scriptElement.type = "text/javascript";
scriptElement.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
head.appendChild(scriptElement);

var scriptElement2 = document.createElement("script");
scriptElement2.type = "text/javascript";
scriptElement2.textContent =
  'window.googletag = window.googletag || { cmd: [] };\n\
  googletag.cmd.push(function () {\n\
    googletag\n\
      .defineSlot(\n\
        "/93656639/300x250_campaign",\n\
        [300, 250],\n\
        "div-gpt-ad-1692948587499-0"\n\
      )\n\
      .addService(googletag.pubads());\n\
    googletag.pubads().enableSingleRequest();\n\
    googletag.enableServices();\n\
  });';
head.appendChild(scriptElement2);

var scriptElement3 = document.createElement("script");
scriptElement3.type = "text/javascript";
scriptElement3.src = "//imasdk.googleapis.com/js/sdkloader/ima3.js";
head.appendChild(scriptElement3);

var scriptElement_ads = document.createElement("script");
scriptElement_ads.type = "text/javascript";
scriptElement_ads.textContent =
  'var count = 1;\n\
var Ads = function (application, videoPlayer, isMuted) {\n\
  this.application_ = application;\n\
  this.videoPlayer_ = videoPlayer;\n\
  this.isMuted = isMuted;\n\
  this.customClickDiv_ = document.getElementById("customClick");\n\
  this.contentCompleteCalled_ = false;\n\
  google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);\n\
  this.adDisplayContainer_ = new google.ima.AdDisplayContainer(\n\
    this.videoPlayer_.adContainer,\n\
    this.videoPlayer_.contentPlayer,\n\
    this.customClickDiv_\n\
  );\n\
\n\
  this.adsLoader_ = new google.ima.AdsLoader(this.adDisplayContainer_);\n\
  this.adsManager_ = null;\n\
\n\
  this.adsLoader_.addEventListener(\n\
    google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,\n\
    this.onAdsManagerLoaded_,\n\
    false,\n\
    this\n\
  );\n\
  this.adsLoader_.addEventListener(\n\
    google.ima.AdErrorEvent.Type.AD_ERROR,\n\
    this.onAdError_,\n\
    false,\n\
    this\n\
  );\n\
};\n\
\n\
Ads.prototype.initialUserAction = function () {\n\
  this.adDisplayContainer_.initialize();\n\
  this.videoPlayer_.contentPlayer.load();\n\
};\n\
\n\
Ads.prototype.requestAds = function (adTagUrl) {\n\
  var adsRequest = new google.ima.AdsRequest();\n\
  adsRequest.adTagUrl = adTagUrl;\n\
  adsRequest.linearAdSlotWidth = 640;\n\
  adsRequest.linearAdSlotHeight = 480;\n\
  adsRequest.nonLinearAdSlotWidth = 640;\n\
  adsRequest.nonLinearAdSlotHeight = 480;\n\
  this.adsLoader_.requestAds(adsRequest);\n\
};\n\
\n\
// muted\n\
Ads.prototype.mute = function () {\n\
  this.adsManager_.setVolume(1);\n\
};\n\
\n\
Ads.prototype.unmute = function () {\n\
  this.adsManager_.setVolume(0);\n\
};\n\
\n\
Ads.prototype.pause = function () {\n\
  if (this.adsManager_) {\n\
    this.adsManager_.pause();\n\
  }\n\
};\n\
\n\
Ads.prototype.resume = function () {\n\
  if (this.adsManager_) {\n\
    this.adsManager_.resume();\n\
  }\n\
};\n\
\n\
Ads.prototype.resize = function (width, height) {\n\
  if (this.adsManager_) {\n\
    this.adsManager_.resize(width, height, google.ima.ViewMode.FULLSCREEN);\n\
  }\n\
};\n\
\n\
Ads.prototype.contentEnded = function () {\n\
  this.contentCompleteCalled_ = true;\n\
  this.adsLoader_.contentComplete();\n\
};\n\
\n\
Ads.prototype.onAdsManagerLoaded_ = function (adsManagerLoadedEvent) {\n\
  this.application_.log("Ads loaded.");\n\
  var adsRenderingSettings = new google.ima.AdsRenderingSettings();\n\
  adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;\n\
  this.adsManager_ = adsManagerLoadedEvent.getAdsManager(\n\
    this.videoPlayer_.contentPlayer,\n\
    adsRenderingSettings\n\
  );\n\
  this.startAdsManager_(this.adsManager_);\n\
};\n\
\n\
Ads.prototype.startAdsManager_ = function (adsManager) {\n\
  if (adsManager.isCustomClickTrackingUsed()) {\n\
    this.customClickDiv_.style.display = "table";\n\
  }\n\
  if (this.isMuted) {\n\
    this.adsManager_.setVolume(1);\n\
  } else {\n\
    this.adsManager_.setVolume(0);\n\
  }\n\
\n\
  // Attach the pause/resume events.\n\
  adsManager.addEventListener(\n\
    google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,\n\
    this.onContentPauseRequested_,\n\
    false,\n\
    this\n\
  );\n\
Ads.prototype.startAdsManager_ = function (adsManager) {\n\
  if (adsManager.isCustomClickTrackingUsed()) {\n\
    this.customClickDiv_.style.display = "table";\n\
  }\n\
  if (this.isMuted) {\n\
    this.adsManager_.setVolume(1);\n\
  } else {\n\
    this.adsManager_.setVolume(0);\n\
  }\n\
\n\
  // Attach the pause/resume events.\n\
  adsManager.addEventListener(\n\
    google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,\n\
    this.onContentPauseRequested_,\n\
    false,\n\
    this\n\
  );\n\
  adsManager.addEventListener(\n\
    google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,\n\
    this.onContentResumeRequested_,\n\
    false,\n\
    this\n\
  );\n\
  adsManager.addEventListener(\n\
    google.ima.AdEvent.Type.COMPLETE,\n\
    this.onAdComplete_,\n\
    false,\n\
    this\n\
  );\n\
  adsManager.addEventListener(\n\
    google.ima.AdEvent.Type.LOADED,\n\
    this.onAdLoaded_,\n\
    false,\n\
    this\n\
  );\n\
  adsManager.addEventListener(\n\
    google.ima.AdEvent.Type.STARTED,\n\
    this.onAdStarted_,\n\
    false,\n\
    this\n\
  );\n\
\n\
  // Handle errors.\n\
  adsManager.addEventListener(\n\
    google.ima.AdErrorEvent.Type.AD_ERROR,\n\
    this.onAdError_,\n\
    false,\n\
    this\n\
  );\n\
\n\
  var events = [\n\
    google.ima.AdEvent.Type.ALL_ADS_COMPLETED,\n\
    google.ima.AdEvent.Type.CLICK,\n\
    google.ima.AdEvent.Type.COMPLETE,\n\
    google.ima.AdEvent.Type.FIRST_QUARTILE,\n\
    google.ima.AdEvent.Type.LOADED,\n\
    google.ima.AdEvent.Type.MIDPOINT,\n\
    google.ima.AdEvent.Type.PAUSED,\n\
    google.ima.AdEvent.Type.STARTED,\n\
    google.ima.AdEvent.Type.THIRD_QUARTILE,\n\
  ];\n\
\n\
  for (var index in events) {\n\
    adsManager.addEventListener(events[index], this.onAdEvent_, false, this);\n\
  }\n\
\n\
  var initWidth, initHeight;\n\
  if (this.application_.fullscreen) {\n\
    initWidth = this.application_.fullscreenWidth;\n\
    initHeight = this.application_.fullscreenHeight;\n\
  } else {\n\
    initWidth = this.videoPlayer_.width;\n\
    initHeight = this.videoPlayer_.height;\n\
  }\n\
\n\
  adsManager.init(initWidth, initHeight, google.ima.ViewMode.NORMAL);\n\
  adsManager.start();\n\
};\n\
Ads.prototype.onAdComplete_ = function () {\n\
    this.application_.close();\n\
  };\n\
  Ads.prototype.onAdLoaded_ = function () {};\n\
  Ads.prototype.onAdStarted_ = function () {\n\
    var timer = this.adsManager_.getRemainingTime();\n\
    this.application_.countdownUi(timer);\n\
    this.application_.autoplayAds_();\n\
  };\n\
  Ads.prototype.onContentPauseRequested_ = function () {\n\
    this.application_.pauseForAd();\n\
    this.application_.setVideoEndedCallbackEnabled(false);\n\
  };\n\
  \n\
  Ads.prototype.onContentResumeRequested_ = function () {\n\
    this.application_.setVideoEndedCallbackEnabled(true);\n\
    if (!this.contentCompleteCalled_) {\n\
      this.application_.resumeAfterAd();\n\
    }\n\
  };\n\
  \n\
  Ads.prototype.onAdEvent_ = function (adEvent) {\n\
    this.application_.log("Ad event: " + adEvent.type);\n\
    // this.application_.countdownUi(this.adsManager_.getRemainingTime());\n\
    if (adEvent.type == google.ima.AdEvent.Type.CLICK) {\n\
      this.application_.adClicked();\n\
    } else if (adEvent.type == google.ima.AdEvent.Type.LOADED) {\n\
      var ad = adEvent.getAd();\n\
      if (!ad.isLinear()) {\n\
        this.onContentResumeRequested_();\n\
      }\n\
    } else if (adEvent.type == google.ima.AdEvent.Type.MIDPOINT) {\n\
    }\n\
  };\n\
  \n\
  Ads.prototype.onAdError_ = function (adErrorEvent) {\n\
    this.application_.log("Ad error: " + adErrorEvent.getError().toString());\n\
    if (count <= 3) {\n\
      setTimeout(() => {\n\
        this.application_.loadAds_();\n\
      }, 10000);\n\
      count++;\n\
    } else {\n\
      var bannerAfter = document.getElementById("div-gpt-ad-1692948587499-0");\n\
      googletag.cmd.push(function () {\n\
        googletag.display("div-gpt-ad-1692948587499-0");\n\
      });\n\
    }\n\
    if (this.adsManager_) {\n\
      this.adsManager_.destroy();\n\
    }\n\
    this.application_.resumeAfterAd();\n\
  };';
head.appendChild(scriptElement_ads);

var scriptElement_video = document.createElement("script");
scriptElement_video.type = "text/javascript";
scriptElement_video.textContent =
  '// Copyright 2013 Google Inc. All Rights Reserved.\n\
// You may study, modify, and use this example for any purpose.\n\
// Note that this example is provided "as is", WITHOUT WARRANTY\n\
// of any kind either expressed or implied.\n\
\n\
/**\n\
 * Handles video player functionality.\n\
 */\n\
var VideoPlayer = function() {\n\
  this.contentPlayer = document.getElementById("content");\n\
  this.adContainer = document.getElementById("adcontainer");\n\
  this.videoPlayerContainer_ = document.getElementById("videoplayer");\n\
\n\
  this.width = 300;\n\
  this.height = 250;\n\
};\n\
\n\
VideoPlayer.prototype.preloadContent = function(contentLoadedAction) {\n\
  // If this is the initial user action on iOS or Android device,\n\
  // simulate playback to enable the video element for later program-triggered\n\
  // playback.\n\
  if (this.isMobilePlatform()) {\n\
    this.preloadListener_ = contentLoadedAction;\n\
    this.contentPlayer.addEventListener(\n\
        "loadedmetadata", contentLoadedAction, false);\n\
    this.contentPlayer.load();\n\
  } else {\n\
    contentLoadedAction();\n\
  }\n\
};\n\
\n\
VideoPlayer.prototype.removePreloadListener = function() {\n\
  if (this.preloadListener_) {\n\
    this.contentPlayer.removeEventListener(\n\
        "loadedmetadata", this.preloadListener_, false);\n\
    this.preloadListener_ = null;\n\
  }\n\
};\n\
\n\
VideoPlayer.prototype.play = function() {\n\
  this.contentPlayer.play();\n\
};\n\
\n\
VideoPlayer.prototype.pause = function() {\n\
  this.contentPlayer.pause();\n\
};\n\
\n\
VideoPlayer.prototype.isMobilePlatform = function() {\n\
  return this.contentPlayer.paused &&\n\
      (navigator.userAgent.match(/(iPod|iPhone|iPad)/) ||\n\
       navigator.userAgent.toLowerCase().indexOf("android") > -1);\n\
};\n\
\n\
VideoPlayer.prototype.resize = function(position, top, left, width, height) {\n\
  this.videoPlayerContainer_.style.position = position;\n\
  this.videoPlayerContainer_.style.top = top + "px";\n\
  this.videoPlayerContainer_.style.left = left + "px";\n\
  this.videoPlayerContainer_.style.width = width + "px";\n\
  this.videoPlayerContainer_.style.height = height + "px";\n\
  this.contentPlayer.style.width = width + "px";\n\
  this.contentPlayer.style.height = height + "px";\n\
};\n\
\n\
VideoPlayer.prototype.registerVideoEndedCallback = function(callback) {\n\
  this.contentPlayer.addEventListener("ended", callback, false);\n\
};\n\
\n\
VideoPlayer.prototype.removeVideoEndedCallback = function(callback) {\n\
  this.contentPlayer.removeEventListener("ended", callback, false);\n\
};';
head.appendChild(scriptElement_video);

var scriptElement_app = document.createElement("script");
scriptElement_app.type = "text/javascript";
scriptElement_app.textContent =
  'var time = null;\n\
var progessValue = 0;\n\
var playButton_;\n\
const Application = function () {\n\
  this.mainSticky = document.getElementById("mainSticky");\n\
  playButton_ = document.getElementById("playpause");\n\
  playButton_.addEventListener("click", this.bind_(this, this.onClick_), false);\n\
  this.mute_ = document.getElementById("mute");\n\
  this.mute_.addEventListener("click", this.bind_(this, this.onMute_), false);\n\
  this.fullscreenButton_ = document.getElementById("fullscreen");\n\
  this.fullscreenButton_.addEventListener(\n\
    "click",\n\
    this.bind_(this, this.onFullscreenClick_),\n\
    false\n\
  );\n\
  //removeAds\n\
  this.close_ = document.getElementById("closeAds");\n\
  this.close_.addEventListener("click", this.bind_(this, this.remove_), false);\n\
  this.close_.style.display = "none";\n\
  //ReloadAds\n\
  this.reloadAds_ = document.getElementById("reloadAds");\n\
  this.reloadAds_.addEventListener(\n\
    "click",\n\
    this.bind_(this, this.onClick_),\n\
    false\n\
  );\n\
  this.reloadAds_.style.display = "none";\n\
  //progess\n\
  countdownUi = document.getElementById("countdownUi");\n\
  progressAds = document.getElementById("progressAds");\n\
  //full screen\n\
  this.fullscreenWidth = null;\n\
  this.fullscreenHeight = null;\n\
  const fullScreenEvents = [\n\
    "fullscreenchange",\n\
    "mozfullscreenchange",\n\
    "webkitfullscreenchange",\n\
  ];\n\
  for (let key in fullScreenEvents) {\n\
    document.addEventListener(\n\
      fullScreenEvents[key],\n\
      this.bind_(this, this.onFullscreenChange_),\n\
      false\n\
    );\n\
  }\n\
  this.playing_ = false;\n\
  this.adsActive_ = false;\n\
  this.adsDone_ = false;\n\
  this.fullscreen = false;\n\
  this.adsMute_ = true;\n\
  this.videoPlayer_ = new VideoPlayer();\n\
  this.ads_ = new Ads(this, this.videoPlayer_, this.adsMute_);\n\
  this.adTagUrl_ = "";\n\
  this.videoEndedCallback_ = this.bind_(this, this.onContentEnded_);\n\
  this.setVideoEndedCallbackEnabled(true);\n\
  setTimeout(autoOnClick_, 3000);\n\
};\n\
function autoOnClick_() {\n\
  playButton_.click();\n\
}\n\
Application.prototype.SAMPLE_AD_TAG_ =\n\
  // "https://pubads.g.doubleclick.net/" +\n\
  // "gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&" +\n\
  // "cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&" +\n\
  // "gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&" +\n\
  // "correlator=";\n\
  "https://pubads.g.doubleclick.net/gampad/ads?iu=/93656639,52958642/outstream_video_OO&description_url=http%3A%2F%2Fnetlink.vn&tfcd=0&npa=0&sz=400x300%7C640x360%7C640x480&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=";\n\
// "https://pubads.g.doubleclick.net/gampad/ads?iu=/93656639,52958642/video_outstream_campain&description_url=https%3A%2F%2Fnetlink.vn%2F&tfcd=0&npa=0&sz=640x480&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=";\n\
Application.prototype.setVideoEndedCallbackEnabled = function (enable) {\n\
  if (enable) {\n\
    this.videoPlayer_.registerVideoEndedCallback(this.videoEndedCallback_);\n\
  } else {\n\
    this.videoPlayer_.removeVideoEndedCallback(this.videoEndedCallback_);\n\
  }\n\
};\n\
Application.prototype.log = function (message) {\n\
  console.log(message);\n\
};\n\
Application.prototype.countdownUi = function (timer) {\n\
  progressAds.max = timer;\n\
  progessValue = timer;\n\
  countdownTimer();\n\
};\n\
function countdownTimer() {\n\
  time = setInterval(function () {\n\
    progressAds.value = progessValue;\n\
    var minutes = Math.floor((progessValue % (60 * 60)) / 60);\n\
    var seconds = Math.floor(progessValue % 60);\n\
    if (progessValue > 0) {\n\
      progessValue--;\n\
    } else {\n\
      countdownUi.style.display = "none";\n\
    }\n\
    countdownUi.innerHTML =\n\
      (minutes > 11 ? minutes : "0" + minutes) +\n\
      ":" +\n\
     (seconds >= 10 ? seconds : "0" + seconds);\n\
  }, 1000);\n\
}\n\
Application.prototype.resumeAfterAd = function () {\n\
  this.videoPlayer_.play();\n\
  this.adsActive_ = false;\n\
  this.updateChrome_();\n\
};\n\
Application.prototype.close = function () {\n\
  playButton_.style.display = "none";\n\
  this.fullscreenButton_.style.display = "none";\n\
  this.mute_.style.display = "none";\n\
  this.close_.style.display = "block";\n\
  // this.reloadAds_.style.display = "block";\n\
  // this.onClick_();\n\
};\n\
Application.prototype.remove_ = function () {\n\
  mainSticky.classList.add("mainSticky--transition");\n\
};\n\
Application.prototype.autoplayAds_ = function () {\n\
  mainSticky.style.display = "block";\n\
};\n\
Application.prototype.pauseForAd = function () {\n\
  this.adsActive_ = true;\n\
  this.playing_ = true;\n\
  this.videoPlayer_.pause();\n\
  this.updateChrome_();\n\
};\n\
Application.prototype.adClicked = function () {\n\
  if (this.playing_) {\n\
    playButton_.click();\n\
  }\n\
};\n\
Application.prototype.bind_ = function (thisObj, fn) {\n\
  return function () {\n\
    fn.apply(thisObj, arguments);\n\
  };\n\
};\n\
Application.prototype.onClick_ = function () {\n\
    if (!this.adsDone_) {\n\
      this.adTagUrl_ = this.SAMPLE_AD_TAG_;\n\
      this.ads_.initialUserAction();\n\
      this.videoPlayer_.preloadContent(this.bind_(this, this.loadAds_));\n\
      this.adsDone_ = true;\n\
      return;\n\
    }\n\
    \n\
    if (this.adsActive_) {\n\
      if (this.playing_) {\n\
        this.ads_.pause();\n\
        clearInterval(time);\n\
      } else {\n\
        this.ads_.resume();\n\
        countdownTimer();\n\
      }\n\
    }\n\
    \n\
    this.playing_ = !this.playing_;\n\
    \n\
    this.updateChrome_();\n\
  };\n\
  \n\
  Application.prototype.onMute_ = function () {\n\
    if (this.adsActive_) {\n\
      if (this.adsMute_) {\n\
        this.ads_.unmute();\n\
      } else {\n\
        this.ads_.mute();\n\
      }\n\
    }\n\
    this.adsMute_ = !this.adsMute_;\n\
    \n\
    this.updateMuted_();\n\
  };\n\
  \n\
  Application.prototype.updateMuted_ = function () {\n\
    if (this.adsMute_) {\n\
      this.mute_.textContent = "🔈";\n\
    } else {\n\
      this.mute_.textContent = "🔇";\n\
    }\n\
  };\n\
  \n\
  Application.prototype.onFullscreenClick_ = function () {\n\
    if (this.fullscreen) {\n\
      const cancelFullscreen =\n\
        document.exitFullscreen ||\n\
        document.exitFullScreen ||\n\
        document.webkitCancelFullScreen ||\n\
        document.mozCancelFullScreen;\n\
      if (cancelFullscreen) {\n\
        cancelFullscreen.call(document);\n\
      } else {\n\
        this.onFullscreenChange_();\n\
      }\n\
    } else {\n\
      const requestFullscreen =\n\
        document.documentElement.requestFullscreen ||\n\
        document.documentElement.webkitRequestFullscreen ||\n\
        document.documentElement.mozRequestFullscreen ||\n\
        document.documentElement.requestFullScreen ||\n\
        document.documentElement.webkitRequestFullScreen ||\n\
        document.documentElement.mozRequestFullScreen;\n\
      if (requestFullscreen) {\n\
        this.fullscreenWidth = window.screen.width;\n\
        this.fullscreenHeight = window.screen.height;\n\
        requestFullscreen.call(document.documentElement);\n\
      } else {\n\
        this.fullscreenWidth = window.innerWidth;\n\
        this.fullscreenHeight = window.innerHeight;\n\
        this.onFullscreenChange_();\n\
      }\n\
    }\n\
    requestFullscreen.call(document.documentElement);\n\
  };\n\
  Application.prototype.updateChrome_ = function () {\n\
    if (this.playing_) {\n\
      playButton_.textContent = "II";\n\
    } else {\n\
      playButton_.textContent = String.fromCharCode(9654);\n\
    }\n\
  };\n\
  Application.prototype.loadAds_ = function () {\n\
    this.videoPlayer_.removePreloadListener();\n\
    this.ads_.requestAds(this.adTagUrl_);\n\
  };\n\
  Application.prototype.onFullscreenChange_ = function () {\n\
    if (this.fullscreen) {\n\
      this.ads_.resize(this.videoPlayer_.width, this.videoPlayer_.height);\n\
      this.videoPlayer_.resize(\n\
        "relative",\n\
        "",\n\
        "",\n\
        this.videoPlayer_.width,\n\
        this.videoPlayer_.height\n\
      );\n\
      this.fullscreen = false;\n\
    } else {\n\
      const width = this.fullscreenWidth;\n\
      const height = this.fullscreenHeight;\n\
      this.makeAdsFullscreen_();\n\
      this.videoPlayer_.resize("relative", 0, 0, width, height);\n\
      this.fullscreen = true;\n\
    }\n\
  };\n\
  Application.prototype.makeAdsFullscreen_ = function () {\n\
    this.ads_.resize(this.fullscreenWidth, this.fullscreenHeight);\n\
  };\n\
  Application.prototype.onContentEnded_ = function () {\n\
    this.ads_.contentEnded();\n\
  };\n\
  ';
head.appendChild(scriptElement_app);

var scriptElement_style = document.createElement("style");
scriptElement_style.textContent = `body {
    font-family: arial, verdana, sans-serif;
  }
  
  #container {
    width: 728px;
  }
  
  #videoplayer {
    position: relative;
    background-color: #000;
    /* border-radius: 5px; */
    box-shadow: 0px 0px 20px rgba(50, 50, 50, 0.5);
    width: 300px;
    height: 250px;
  }
  
  #content-wrapper {
    position: relative;
  }
  #mainSticky {
    position: fixed;
    bottom: 0;
    display: none;
    opacity: 1;
    transition: transform 0.3s, opacity 0.5s;
  }
  .mainSticky--transition {
    transform: translateY(500px);
    opacity: 0;
    display: none;
  }
  
  #playpause {
    position: absolute;
    left: 15px;
    bottom: 15px;
    height: 20px;
    width: 40px;
    border-style: none;
    font-weight: bold;
    font-size: 15px;
    opacity: 0.5;
    background-color: #fff;
    border-radius: 5px;
    border: 1px transparent solid;
    color: #000;
    cursor: pointer;
    border-color: #000;
    line-height: 0;
  }
  
  #playpause:hover {
    border: 1px #f00 solid;
    color: #f00;
  }
  
  #fullscreen {
    position: absolute;
    bottom: 15px;
    right: 25px;
    height: 20px;
    width: 40px;
    border-style: none;
    font-weight: bold;
    font-size: 15px;
    opacity: 0.5;
    background-color: #fff;
    border-radius: 5px;
    border: 1px transparent solid;
    color: #000;
    /* cursor: pointer; */
    border-color: #000;
    line-height: 0;
  }
  
  #fullscreen:hover {
    border: 1px #f00 solid;
    color: #f00;
  }
  
  #content {
    overflow: hidden;
  }
  
  #content,
  #adcontainer {
    position: absolute;
    width: 640px;
    height: 360px;
  }
  
  #companionDiv,
  #customClick {
    width: 728px;
    display: none;
  }
  #customClick {
    background-color: #807f80;
    display: none;
    text-align: center;
  }
  
  #customClickTextWrapper {
    display: table-cell;
    vertical-align: middle;
    display: none;
  }
  
  #mute {
    position: absolute;
    left: 70px;
    bottom: 15px;
    height: 20px;
    width: 40px;
    border-style: none;
    font-weight: bold;
    font-size: 15px;
    opacity: 0.5;
    background-color: #fff;
    border-radius: 5px;
    border: 1px transparent solid;
    color: #000;
    cursor: pointer;
    border-color: #000;
    line-height: 0;
  }
  
  #mute:hover {
    border: 1px #f00 solid;
    color: #f00;
  }
  
  #closeAds {
    position: absolute;
    right: 0px;
    top: 0px;
    height: 20px;
    width: 40px;
    border-style: none;
    font-weight: bold;
    font-size: 15px;
    opacity: 0.5;
    background-color: #fff;
    border-radius: 5px;
    border: 1px transparent solid;
    color: #000;
    cursor: pointer;
    border-color: #000;
    line-height: 0;
  }
  
  #closeAds:hover {
    border: 1px #f00 solid;
    color: #f00;
  }
  
  #reloadAds {
    position: absolute;
    left: 0px;
    top: 0px;
    height: 20px;
    width: 40px;
    border-style: none;
    font-weight: bold;
    font-size: 15px;
    opacity: 0.5;
    background-color: #fff;
    border-radius: 5px;
    border: 1px transparent solid;
    color: #000;
    cursor: pointer;
    border-color: #000;
    line-height: 0;
  }
  
  #reloadAds:hover {
    border: 1px #f00 solid;
    color: #f00;
  }
  
  #countdownUi {
    position: absolute;
    right: 0px;
    bottom: -10px;
    height: 20px;
    width: 40px;
    font-weight: normal;
    font-size: 11px;
    opacity: 0.5;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
    line-height: 0;
  }
  
  #progressAds {
    position: absolute;
    background-color: rgb(80, 97, 5);
    height: 3px;
    width: 100%;
    bottom: 0;
  }
  progress::-moz-progress-bar {
    background: rgb(209, 126, 1);
  }
  progress::-webkit-progress-value {
    background: rgb(209, 126, 1);
  }
  
  #bannerAfter {
    position: fixed;
    left: 0px;
    bottom: 0px;
    height: 250px;
    width: 300px;
    cursor: pointer;
    line-height: 0;
  }
  `;
head.appendChild(scriptElement_style);
