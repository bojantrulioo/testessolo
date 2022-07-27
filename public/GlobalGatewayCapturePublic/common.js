(function () {
  const that = {};

  that.imageCompressionOption = {
    maxSizeMB: 4,
    maxWidthOrHeight: 4096,
    useWebWorker: true,
  };

  that.addCaptureButton = (mitekScienceSDK) => {
    const mitekDisplayContainer = document.querySelector('#mitekDisplayContainer');

    // add a button to allow the user to capture a frame
    const buttonEl = document.createElement('button');
    buttonEl.setAttribute('id', 'mitekCaptureButton');
    buttonEl.setAttribute('style', 'position: absolute; bottom: 5px; z-index: 100; opacity:0.8; width:60px; height:60px; border-radius:50%; background-color:white; border:2px solid black; box-shadow: 0 0 0 3px white;');

    buttonEl.onclick = () => {
      mitekScienceSDK.cmd('CAPTURE_FRAME');
    };
    mitekDisplayContainer.appendChild(buttonEl);
  };

  that.getLocationPermission = async () => new Promise((resolve) => {
    const returnPosition = () => {
      resolve();
    };
    const errorHandle = () => {
      resolve();
    };
    navigator.geolocation.getCurrentPosition(returnPosition, errorHandle);
  });

  that.getDeviceType = () => {
    const { userAgent } = navigator;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
      return 'Tablet';
    }
    if (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
      return 'Mobile';
    }
    return 'Desktop';
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      // eslint-disable-next-line no-multi-assign
      exports = module.exports = that;
    }
    exports.common = that;
  } else {
    window.common = that;
  }
}());
