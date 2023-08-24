var time = null;
var progessValue = 0;
var playButton_;
const Application = function () {
  this.mainSticky = document.getElementById("mainSticky");
  playButton_ = document.getElementById("playpause");

  playButton_.addEventListener("click", this.bind_(this, this.onClick_), false);

  this.mute_ = document.getElementById("mute");
  this.mute_.addEventListener("click", this.bind_(this, this.onMute_), false);
  this.fullscreenButton_ = document.getElementById("fullscreen");
  this.fullscreenButton_.addEventListener(
    "click",
    this.bind_(this, this.onFullscreenClick_),
    false
  );

  //removeAds
  this.close_ = document.getElementById("closeAds");
  this.close_.addEventListener("click", this.bind_(this, this.remove_), false);
  this.close_.style.display = "none";

  //ReloadAds
  this.reloadAds_ = document.getElementById("reloadAds");
  this.reloadAds_.addEventListener(
    "click",
    this.bind_(this, this.onClick_),
    false
  );
  this.reloadAds_.style.display = "none";

  //progess
  countdownUi = document.getElementById("countdownUi");
  progressAds = document.getElementById("progressAds");
  //full screen
  this.fullscreenWidth = null;
  this.fullscreenHeight = null;
  const fullScreenEvents = [
    "fullscreenchange",
    "mozfullscreenchange",
    "webkitfullscreenchange",
  ];
  for (let key in fullScreenEvents) {
    document.addEventListener(
      fullScreenEvents[key],
      this.bind_(this, this.onFullscreenChange_),
      false
    );
  }
  this.playing_ = false;
  this.adsActive_ = false;
  this.adsDone_ = false;
  this.fullscreen = false;
  this.adsMute_ = true;
  this.videoPlayer_ = new VideoPlayer();
  this.ads_ = new Ads(this, this.videoPlayer_, this.adsMute_);
  this.adTagUrl_ = "";
  this.videoEndedCallback_ = this.bind_(this, this.onContentEnded_);
  this.setVideoEndedCallbackEnabled(true);
  window.addEventListener("scroll", function () {});
  setTimeout(autoOnClick_, 3000);
};
function autoOnClick_() {
  playButton_.click();
}

Application.prototype.SAMPLE_AD_TAG_ =
  // "https://pubads.g.doubleclick.net/" +
  // "gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&" +
  // "cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&" +
  // "gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&" +
  // "correlator=";
  // "https://pubads.g.doubleclick.net/gampad/ads?iu=/93656639,52958642/outstream_video_OO&description_url=https%3A%2F%2Fnetlink.vn%2F&tfcd=0&npa=0&sz=300x250%7C640x480&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=";
  "https://pubads.g.doubleclick.net/gampad/ads?iu=/93656639,52958642/video_outstream_campain&description_url=https%3A%2F%2Fnetlink.vn%2F&tfcd=0&npa=0&sz=1x1%7C300x250%7C640x480%7C1920x1080&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=";

/**
 * Registers or removes video ended callback based on the 'enable' param.
 * @param {boolean} enable
 */
Application.prototype.setVideoEndedCallbackEnabled = function (enable) {
  if (enable) {
    this.videoPlayer_.registerVideoEndedCallback(this.videoEndedCallback_);
  } else {
    this.videoPlayer_.removeVideoEndedCallback(this.videoEndedCallback_);
  }
};

Application.prototype.log = function (message) {
  console.log(message);
};

Application.prototype.countdownUi = function (timer) {
  progressAds.max = timer;
  progessValue = timer;
  countdownTimer();
};

function countdownTimer() {
  time = setInterval(function () {
    progressAds.value = progessValue;
    var minutes = Math.floor((progessValue % (60 * 60)) / 60);
    var seconds = Math.floor(progessValue % 60);
    if (progessValue > 0) {
      progessValue--;
    } else {
      countdownUi.style.display = "none";
    }
    countdownUi.innerHTML =
      (minutes > 11 ? minutes : "0" + minutes) +
      ":" +
      (seconds >= 10 ? seconds : "0" + seconds);
  }, 1000);
}

/**
 * Handles resuming content following ads.
 */
Application.prototype.resumeAfterAd = function () {
  this.videoPlayer_.play();
  this.adsActive_ = false;
  this.updateChrome_();
};
Application.prototype.close = function () {
  playButton_.style.display = "none";
  this.fullscreenButton_.style.display = "none";
  this.mute_.style.display = "none";
  this.close_.style.display = "block";
  this.reloadAds_.style.display = "block";
  // this.onClick_();
};
Application.prototype.remove_ = function () {
  mainSticky.classList.add("mainSticky--transition");

  // mainSticky.style.display = "none";
  //
};
Application.prototype.autoplayAds_ = function () {
  mainSticky.style.display = "block";
};

/**
 * Handles pausing content for ad breaks.
 */
Application.prototype.pauseForAd = function () {
  this.adsActive_ = true;
  this.playing_ = true;
  this.videoPlayer_.pause();
  this.updateChrome_();
};

/**
 * Pauses video on ad clicks.
 */
Application.prototype.adClicked = function () {
  if (this.playing_) {
    playButton_.click();
  }
};

/**
 * Function binding helper function.
 * @param {!Object} thisObj object to bind function.
 * @param {!Function} fn function being bound to object.
 * @return {!Function} returns the bound function.
 */
Application.prototype.bind_ = function (thisObj, fn) {
  return function () {
    fn.apply(thisObj, arguments);
  };
};
Application.prototype.onClick_ = function () {
  if (!this.adsDone_) {
    this.adTagUrl_ = this.SAMPLE_AD_TAG_;
    this.ads_.initialUserAction();
    this.videoPlayer_.preloadContent(this.bind_(this, this.loadAds_));
    this.adsDone_ = true;
    return;
  }

  if (this.adsActive_) {
    if (this.playing_) {
      this.ads_.pause();
      clearInterval(time);
    } else {
      this.ads_.resume();
      countdownTimer();
    }
  }

  this.playing_ = !this.playing_;

  this.updateChrome_();
};

Application.prototype.onMute_ = function () {
  if (this.adsActive_) {
    if (this.adsMute_) {
      this.ads_.unmute();
    } else {
      this.ads_.mute();
    }
  }
  this.adsMute_ = !this.adsMute_;

  this.updateMuted_();
};

Application.prototype.updateMuted_ = function () {
  if (this.adsMute_) {
    this.mute_.textContent = "🔈";
  } else {
    this.mute_.textContent = "🔇";
  }
};

Application.prototype.onFullscreenClick_ = function () {
  if (this.fullscreen) {
    // The video is currently in fullscreen mode
    const cancelFullscreen =
      document.exitFullscreen ||
      document.exitFullScreen ||
      document.webkitCancelFullScreen ||
      document.mozCancelFullScreen;
    if (cancelFullscreen) {
      cancelFullscreen.call(document);
    } else {
      this.onFullscreenChange_();
    }
  } else {
    // Try to enter fullscreen mode in the browser
    const requestFullscreen =
      document.documentElement.requestFullscreen ||
      document.documentElement.webkitRequestFullscreen ||
      document.documentElement.mozRequestFullscreen ||
      document.documentElement.requestFullScreen ||
      document.documentElement.webkitRequestFullScreen ||
      document.documentElement.mozRequestFullScreen;
    if (requestFullscreen) {
      this.fullscreenWidth = window.screen.width;
      this.fullscreenHeight = window.screen.height;
      requestFullscreen.call(document.documentElement);
    } else {
      this.fullscreenWidth = window.innerWidth;
      this.fullscreenHeight = window.innerHeight;
      this.onFullscreenChange_();
    }
  }
  requestFullscreen.call(document.documentElement);
};

/**
 * Handles updating the play button image.
 */
Application.prototype.updateChrome_ = function () {
  if (this.playing_) {
    playButton_.textContent = "II";
  } else {
    // Unicode play symbol.
    playButton_.textContent = String.fromCharCode(9654);
  }
};

/**
 * Removes the 'loadedmetadata' listener and makes the ad request.
 */
Application.prototype.loadAds_ = function () {
  this.videoPlayer_.removePreloadListener();
  this.ads_.requestAds(this.adTagUrl_);
};

/**
 * Handles resizing ads and content during fullscreen button clicks.
 */
Application.prototype.onFullscreenChange_ = function () {
  if (this.fullscreen) {
    // The user just exited fullscreen
    // Resize the ad container
    this.ads_.resize(this.videoPlayer_.width, this.videoPlayer_.height);
    // Return the video to its original size and position
    this.videoPlayer_.resize(
      "relative",
      "",
      "",
      this.videoPlayer_.width,
      this.videoPlayer_.height
    );
    this.fullscreen = false;
  } else {
    // The fullscreen button was just clicked
    // Resize the ad container
    const width = this.fullscreenWidth;
    const height = this.fullscreenHeight;
    this.makeAdsFullscreen_();
    // Make the video take up the entire screen
    this.videoPlayer_.resize("relative", 0, 0, width, height);
    this.fullscreen = true;
  }
};

/**
 * Resizes ads for fullscreen.
 */
Application.prototype.makeAdsFullscreen_ = function () {
  this.ads_.resize(this.fullscreenWidth, this.fullscreenHeight);
};

/**
 * Makes call to update UI on content ending.
 */
Application.prototype.onContentEnded_ = function () {
  this.ads_.contentEnded();
};
