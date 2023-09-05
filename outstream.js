var time = 0;
var progessValue = 0;
var checkScroll = true;
var isView = true;
var resizeads_;
const Application = function () {
  this.mainSticky = document.getElementById("mainSticky");
  this.mute_ = document.getElementById("mute");
  this.mute_.addEventListener("click", this.bind_(this, this.onMute_), false);
  this.fullscreenButton_ = document.getElementById("fullscreen");
  this.fullscreenButton_.addEventListener(
    "click",
    this.bind_(this, this.onFullscreenClick_),
    false
  );

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
  this.adsMute_ = false;
  this.videoPlayer_ = new VideoPlayer();
  this.ads_ = new Ads(this, this.videoPlayer_, this.adsMute_);
  this.adTagUrl_ = "";
  this.videoEndedCallback_ = this.bind_(this, this.onContentEnded_);
  this.setVideoEndedCallbackEnabled(true);
  setTimeout(this.bind_(this, this.onClick_), 3000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      if (isView) {
        this.ads_.resume();
        countdownTimer();
      }
    } else {
      this.ads_.pause();
      clearInterval(time);
    }
  });
  // document.addEventListener('scroll', () => {
  //   if (!checkScroll) {
  //     if (divView_(this.mainSticky)) {
  //       isView = true;
  //       this.ads_.resume();
  //       countdownTimer();
  //     } else {
  //       isView = false;
  //       this.ads_.pause();
  //       clearInterval(time);
  //     }
  //   }
  //   // else {
  //   //   this.ads_.resume();
  //   //   countdownTimer();
  //   // }

  // })
};

function divView_(element) {
  var rect = element.getBoundingClientRect();
  var positionY = window.pageYOffset || document.documentElement.scrollTop;
  return (
    (rect.top >= 0 &&
      rect.top <=
        rect.bottom +
          positionY -
          (window.innerHeight || document.documentElement.clientHeight)) ||
    (rect.top < 0 &&
      rect.bottom + 250 >=
        rect.top +
          positionY -
          (window.innerHeight || document.documentElement.clientHeight))
  );
}

Application.prototype.SAMPLE_AD_TAG_ =
  "https://pubads.g.doubleclick.net/gampad/ads?iu=/93656639/video_outstream_campain&description_url=http%3A%2F%2Fnetlink.vn&tfcd=0&npa=0&sz=400x300&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=";
// "https://pubads.g.doubleclick.net/gampad/ads?iu=/93656639,22942653061/Tinmoi.vn_Oustream/Tinmoi.vn_Vast_Test&description_url=https%3A%2F%2Ftinmoi.vn%2F&tfcd=0&npa=0&sz=400x300%7C640x360%7C640x480&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=";
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
Application.prototype.onDelete_ = function () {
  checkScroll = false;
  this.mainSticky.classList.remove("mainSticky--outstream");
  resizeads_.style.display = "none";
  if (!divView_(this.mainSticky)) {
    this.ads_.pause();
    clearInterval(time);
    isView = false;
  }
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
  // this.videoPlayer_.play();
  this.adsActive_ = false;
};
Application.prototype.close = function () {
  if (this.fullscreen) {
    document.exitFullscreen();
  }
  this.fullscreenButton_.style.display = "none";
  this.mute_.style.display = "none";
  this.mainSticky.style.display = "none";
  var bannerAfter = document.getElementById("bannerAfter");
  var closeBanner = document.getElementById("closeBanner");
  var idAdUnit = document.createElement("div");
  idAdUnit.id = "div-gpt-ad-1693468092398-0";
  bannerAfter.appendChild(idAdUnit);
  var isClose = false;
  googletag.cmd.push(function () {
    googletag.display("div-gpt-ad-1693468092398-0");
    googletag.pubads().addEventListener("slotOnload", (event) => {
      closeBanner.style.display = "block";
    });
  });
  closeBanner.addEventListener("click", function () {
    if (isClose) {
      closeBanner.title = "Hidden";
      closeBanner.innerHTML = "&#711;";
      bannerAfter.classList.remove("bannerAfterClose--transition");
      closeBanner.classList.remove("closeBanner--transition");
    } else {
      closeBanner.title = "Show";
      closeBanner.innerHTML = "&#710;";
      bannerAfter.classList.add("bannerAfterClose--transition");
      closeBanner.classList.add("closeBanner--transition");
    }
    isClose = !isClose;
  });
};
Application.prototype.remove_ = function () {};
Application.prototype.autoplayAds_ = function () {
  mainSticky.style.display = "block";
  resizeads_ = document.getElementById("resizeads");
  resizeads_.addEventListener("click", this.bind_(this, this.onDelete_), false);
  resizeads_.style.display = "none";
  document.addEventListener("scroll", () => {
    if (divView_(this.mainSticky)) {
      if (!isView) {
        this.ads_.resume();
        countdownTimer();
      }
      isView = true;
    } else {
      if (isView) {
        this.ads_.pause();
        clearInterval(time);
      }
      isView = false;
    }
  });
  if (!divView_(this.mainSticky)) {
    this.ads_.pause();
    clearInterval(time);
  }
};
Application.prototype.pauseForAd = function () {
  this.adsActive_ = true;
  this.playing_ = true;
  this.videoPlayer_.pause();
};

/**
 * Pauses video on ad clicks.
 */
Application.prototype.adClicked = function () {};

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
    this.resizeads_.style.display = "block";
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
    this.resizeads_.style.display = "none";
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
