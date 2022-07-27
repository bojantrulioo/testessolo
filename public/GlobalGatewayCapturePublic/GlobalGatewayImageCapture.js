/* eslint-disable no-console */
/* global mitekScienceSDK */
/* global piexif */
/* global MessageFormat */
/* global common */
/* global sdkErrors */
/* global imageCompression */

const EncodeJPG = (imageData, msg, fn) => {
  try {
    const zeroth = {};
    zeroth[piexif.ImageIFD.Software] = msg;
    const exifObj = { '0th': zeroth };
    const exifbytes = piexif.dump(exifObj);
    fn(piexif.insert(exifbytes, imageData));
  } catch (error) {
    console.error(error);
    fn(imageData);
  }
};

const EncodeMsg = (imageData, msg, fn) => {
  const imageType = imageData.substring('data:image/'.length, imageData.indexOf(';base64')).toLowerCase();
  if (imageType === 'jpeg') {
    EncodeJPG(imageData, msg, fn);
  } else {
    // image not support, just calling the success callback
    fn(imageData);
  }
};

(function () {
  try {
    const piexifScript = document.createElement('script');
    piexifScript.src = './GlobalGatewayCapturePublic/piexif.js';
    piexifScript.type = 'module';
    piexifScript.async = true;
    document.body.appendChild(piexifScript);

    const messageFormateScript = document.createElement('script');
    messageFormateScript.src = './GlobalGatewayCapturePublic/MessageFormat.js';
    messageFormateScript.type = 'module';
    messageFormateScript.async = true;
    document.body.appendChild(messageFormateScript);

    const commonScript = document.createElement('script');
    commonScript.src = './GlobalGatewayCapturePublic/common.js';
    commonScript.type = 'module';
    commonScript.async = true;
    document.body.appendChild(commonScript);

    const errorScript = document.createElement('script');
    errorScript.src = './GlobalGatewayCapturePublic/sdk-errors.js';
    errorScript.type = 'module';
    errorScript.async = true;
    document.body.appendChild(errorScript);

    const compressionScript = document.createElement('script');
    compressionScript.src = './GlobalGatewayCapturePublic/browser-image-compression.js';
    compressionScript.type = 'module';
    compressionScript.async = true;
    document.body.appendChild(compressionScript);

    const GlobalGatewayHints = {
      GLOBALGATEWAY_HEAD_OUTSIDE: 'Place Face in Oval',
      GLOBALGATEWAY_HEAD_SKEWED: 'Look Straight Ahead',
      GLOBALGATEWAY_AXIS_ANGLE: 'Hold Phone Upright',
      GLOBALGATEWAY_HEAD_TOO_CLOSE: 'Move Farther Away',
      GLOBALGATEWAY_HEAD_TOO_FAR: 'Get Closer',
      GLOBALGATEWAY_STAY_STILL: 'Hold Still',
      GLOBALGATEWAY_STOP_SMILING: 'Stop Smiling',
      GLOBALGATEWAY_SMILE: 'Smile!',
      GLOBALGATEWAY_READY_POSE: 'Hold it There',
      GLOBALGATEWAY_NO_FACE_FOUND: 'No Face Detected',
      GLOBALGATEWAY_ERROR_GLARE: 'Reduce Glare',
      GLOBALGATEWAY_ERROR_FOUR_CORNER: 'Not all document corners visible',
      GLOBALGATEWAY_SUCCESS: 'Success',
      GLOBALGATEWAY_ERROR_TOO_DARK: 'Too dark. use good lighting',
      GLOBALGATEWAY_ERROR_FOCUS: 'Hold Steady',
      GLOBALGATEWAY_ERROR_MRZ_MISSING: 'Passport Not Detected',
      GLOBALGATEWAY_CV_NO_BARCODE_FOUND: 'No Barcode Detected',
      GLOBALGATEWAY_ERROR_TOO_FAR: 'Document Too Far',
      GLOBALGATEWAY_ERROR_TOO_CLOSE: 'Document Too Close',
      GLOBALGATEWAY_ERROR_NOT_CENTERED: 'Document Not Centered',
      GLOBALGATEWAY_ERROR_MIN_PADDING: 'Move further away',
      GLOBALGATEWAY_ERROR_HORIZONTAL_FILL: 'Move closer',
      GLOBALGATEWAY_ERROR_LOW_CONTRAST: 'Center document on a dark background',
      GLOBALGATEWAY_ERROR_BUSY_BACKGROUND: 'Center document on a plain background',
      GLOBALGATEWAY_ERROR_SKEW_ANGLE: 'Reduce angle',
    };

    const GlobalGatewayCaptureTimeout = 20 * 1000;
    const HINTINTERVAL = 500;

    const HintsTable = {
      MISNAP_HEAD_OUTSIDE: 'GLOBALGATEWAY_HEAD_OUTSIDE',
      MISNAP_HEAD_SKEWED: 'GLOBALGATEWAY_HEAD_SKEWED',
      MISNAP_AXIS_ANGLE: 'GLOBALGATEWAY_AXIS_ANGLE',
      MISNAP_HEAD_TOO_CLOSE: 'GLOBALGATEWAY_HEAD_TOO_CLOSE',
      MISNAP_HEAD_TOO_FAR: 'GLOBALGATEWAY_HEAD_TOO_FAR',
      MISNAP_STAY_STILL: 'GLOBALGATEWAY_STAY_STILL',
      MISNAP_SUCCESS: 'GLOBALGATEWAY_SUCCESS',
      MISNAP_STOP_SMILING: 'GLOBALGATEWAY_STOP_SMILING',
      MISNAP_SMILE: 'GLOBALGATEWAY_SMILE',
      MISNAP_READY_POSE: 'GLOBALGATEWAY_READY_POSE',
      NO_FACE_FOUND: 'GLOBALGATEWAY_NO_FACE_FOUND',
      MITEK_ERROR_GLARE: 'GLOBALGATEWAY_ERROR_GLARE',
      MITEK_ERROR_FOUR_CORNER: 'GLOBALGATEWAY_ERROR_FOUR_CORNER',
      MITEK_ERROR_TOO_DARK: 'GLOBALGATEWAY_ERROR_TOO_DARK',
      MITEK_ERROR_FOCUS: 'GLOBALGATEWAY_ERROR_FOCUS',
      MITEK_ERROR_MRZ_MISSING: 'GLOBALGATEWAY_ERROR_MRZ_MISSING',
      CV_NO_BARCODE_FOUND: 'GLOBALGATEWAY_CV_NO_BARCODE_FOUND',
      MITEK_ERROR_TOO_FAR: 'GLOBALGATEWAY_ERROR_TOO_FAR',
      MITEK_ERROR_TOO_CLOSE: 'GLOBALGATEWAY_ERROR_TOO_CLOSE',
      MITEK_ERROR_NOT_CENTERED: 'GLOBALGATEWAY_ERROR_NOT_CENTERED',
      MITEK_ERROR_MIN_PADDING: 'GLOBALGATEWAY_ERROR_MIN_PADDING',
      MITEK_ERROR_HORIZONTAL_FILL: 'GLOBALGATEWAY_ERROR_HORIZONTAL_FILL',
      MITEK_ERROR_LOW_CONTRAST: 'GLOBALGATEWAY_ERROR_LOW_CONTRAST',
      MITEK_ERROR_BUSY_BACKGROUND: 'GLOBALGATEWAY_ERROR_BUSY_BACKGROUND',
      MITEK_ERROR_SKEW_ANGLE: 'GLOBALGATEWAY_ERROR_SKEW_ANGLE',
    };

    const infoMapper = (info) => GlobalGatewayHints[HintsTable[info]];

    let timer;
    let recentHint = null;
    let hintTimer = null;
    let captureType = null;
    let shouldCollectGeo = false;

    const captureDocumentMap = {
      DOCUMENT: 'DL_FRONT',
      BARCODE: 'DL_FRONT', // we do not provide Barcode snapshot anymore but still have it for backward compatibility
      PASSPORT: 'PASSPORT',
      SELFIE: 'SELFIE',
      GENERIC_DOCUMENT: 'DOCUMENT',
    };

    const Stop = () => {
      mitekScienceSDK.cmd('SDK_STOP');
    };

    const ShowHint = (message) => {
      mitekScienceSDK.cmd('SHOW_HINT', message);
    };

    const HideHint = () => {
      mitekScienceSDK.cmd('HIDE_HINT');
    };

    const StartCamera = (type, message, useButton) => {
      mitekScienceSDK.on('CAMERA_DISPLAY_STARTED', () => {
        ShowHint(message);
        setTimeout(() => {
          HideHint();
        }, 2000);
        if (useButton) {
          common.addCaptureButton(mitekScienceSDK);
        }
      });
    };

    const CaptureAndProcessFrame = (type, isAuto = true) => {
      const captureMode = isAuto ? 'AUTO_CAPTURE' : 'MANUAL_CAPTURE';
      const qualityBasedOnMode = isAuto ? 100 : 90;
      mitekScienceSDK.cmd('CAPTURE_AND_PROCESS_FRAME', {
        mode: captureMode,
        documentType: type,
        options: {
          qualityPercent: qualityBasedOnMode,
        },
      });
    };

    const OnError = (errorHandler) => {
      mitekScienceSDK.on('SDK_ERROR', (err) => {
        errorHandler(err);
      });
    };

    const ProcessCapture = (isAuto, fn, retries) => {
      mitekScienceSDK.on('FRAME_CAPTURE_RESULT', async (result) => {
        if (!isAuto || timer !== null) {
          clearTimeout(timer);
          clearTimeout(hintTimer);
          if (result && result.response && result.response.imageData) {
            const message = await MessageFormat.getMessage(
              isAuto,
              retries,
              captureType,
              mitekScienceSDK.getVersion(),
              shouldCollectGeo,
              common.getDeviceType(),
            );
            EncodeMsg(result.response.imageData, message, fn);
          }
        }
      });
    };

    const ProcessFeedback = (docType, onCaptureFail) => {
      mitekScienceSDK.on('FRAME_PROCESSING_FEEDBACK', (result) => {
        if (result.key === 'IMAGE_SMALLER_THAN_MIN_SIZE') {
          onCaptureFail([sdkErrors.errorTable.IMAGE_SMALLER_THAN_MIN_SIZE]);
          Stop();
        }
        if (result.key === 'CORRUPT_IMAGE') {
          onCaptureFail([sdkErrors.errorTable.CORRUPT_IMAGE]);
          Stop();
        }

        recentHint = result.key;
        if (docType === 'SELFIE') {
          // turn oval green if head is in guide
          const selfieElements = document.getElementsByClassName('integrator SELFIE');
          if (selfieElements.length > 0) {
            if (result.key === 'MISNAP_SMILE'
              || result.key === 'MISNAP_STOP_SMILING'
              || result.key === 'MISNAP_READY_POSE'
            ) {
              selfieElements[0].classList.add('FACE_IN_GUIDE');
            } else {
              selfieElements[0].classList.remove('FACE_IN_GUIDE');
            }
          }

          if (recentHint !== null && infoMapper(recentHint) !== null) {
            mitekScienceSDK.cmd('SHOW_HINT', infoMapper(recentHint));
          }
        } else if (recentHint !== null && infoMapper(recentHint) !== null) {
          mitekScienceSDK.cmd('SHOW_HINT', infoMapper(recentHint));
        }
      });
    };

    const StartProcess = (isAuto, timeout, onCaptureFail) => {
      mitekScienceSDK.on('FRAME_PROCESSING_STARTED', () => {
        if (isAuto) {
          timer = setTimeout(() => {
            timer = null;
            Stop();
            onCaptureFail();
          }, timeout);
          hintTimer = setInterval(() => {
            if (recentHint !== null && infoMapper(recentHint) !== null) {
              mitekScienceSDK.cmd('SHOW_HINT', infoMapper(recentHint));
            }
          }, HINTINTERVAL);

          setTimeout(() => {
            clearTimeout(hintTimer);
          }, timeout);
        }
      });
    };

    const ReadFileAsBase64 = (file, onSuccess, onCaptureFail) => {
      const reader = new FileReader();

      reader.onload = async (e) => {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
          let existingMetadata = '';
          if (file.type === 'image/jpeg') {
            try {
              const exifObj = piexif.load(e.target.result);
              if (exifObj && exifObj['0th'] && exifObj['0th'][piexif.ImageIFD.Software]) {
                existingMetadata = JSON.stringify(exifObj['0th'][piexif.ImageIFD.Software]);
              }
            } catch {
              // something went wrong while loading exif data, reset and continue
              existingMetadata = '';
            }
          } else {
            onSuccess(e.target.result);
            return;
          }
          const message = await MessageFormat.getMessage(
            false,
            0,
            captureType,
            mitekScienceSDK.getVersion(),
            shouldCollectGeo,
            common.getDeviceType(),
            existingMetadata,
          );
          EncodeMsg(e.target.result, message, onSuccess);
        }
      };

      reader.onerror = () => {
        onCaptureFail();
      };

      reader.readAsDataURL(file);
    };

    const HandleUpload = async (e, onSuccess, onCaptureFail) => {
      e.preventDefault();
      let imageFile = e.target.files[0];
      const fileTypeError = sdkErrors.isFileTypeValid(imageFile);
      const pdfFileSizeError = sdkErrors.isPDFFileSizeValid(imageFile);

      if (fileTypeError) {
        onCaptureFail([fileTypeError]);
        return;
      }

      if (pdfFileSizeError) {
        onCaptureFail([pdfFileSizeError]);
        return;
      }

      if (imageFile.type !== 'application/pdf' && imageFile.size > sdkErrors.sizeLimitForFileUpload) {
        try {
          imageFile = await imageCompression(imageFile, common.imageCompressionOption);
        } catch {
          onCaptureFail([sdkErrors.errorTable.CORRUPT_IMAGE]);
          return;
        }
      }
      ReadFileAsBase64(imageFile, onSuccess, onCaptureFail);
    };

    const Upload = (onSuccess = () => {}, onCaptureFail = () => {}) => {
      let inputForm = document.getElementById('ggSdkInternalManualUpload');
      if (!inputForm) {
        inputForm = document.createElement('input');
        inputForm.setAttribute('type', 'file');
        inputForm.setAttribute('id', 'ggSdkInternalManualUpload');
        inputForm.setAttribute('style', 'display:none');
        inputForm.setAttribute('accept', 'image/jpeg,image/png,application/pdf');
        inputForm.addEventListener(
          'change',
          (event) => {
            HandleUpload(event, onSuccess, onCaptureFail);
          },
          true,
        );
      }
      inputForm.click();
    };

    const Start = (
      type,
      message,
      timeout = GlobalGatewayCaptureTimeout,
      isAuto = true,
      onSuccess = () => {},
      onCaptureFail = () => {},
      useButton = false,
      retries = 0,
    ) => {
      recentHint = null;
      if (!isAuto && common.getDeviceType() === 'Desktop') {
        Upload(onSuccess, onCaptureFail);
      } else {
        const el = document.querySelector('div video[autoplay="true"]');
        el.play();
        StartCamera(type, message, useButton);
        ProcessCapture(isAuto, onSuccess, retries);
        StartProcess(isAuto, timeout, onCaptureFail);
        ProcessFeedback(type, onCaptureFail);
        CaptureAndProcessFrame(type, isAuto);
        OnError(onCaptureFail);
      }
    };

    const startCapture = (targetCaptureType) => (
      message,
      timeout = GlobalGatewayCaptureTimeout,
      isAuto = true,
      onSuccess = () => {},
      onCaptureFail = () => {},
      useButton = false,
      retries = 0,
      shouldEnableGeoInfo = false,
    ) => {
      captureType = targetCaptureType;
      shouldCollectGeo = shouldEnableGeoInfo;
      Start(
        captureDocumentMap[targetCaptureType],
        message,
        timeout,
        isAuto,
        onSuccess,
        onCaptureFail,
        useButton,
        retries,
      );
    };

    const StartDocumentCapture = startCapture('DOCUMENT');

    const StartBarcodeCapture = startCapture('BARCODE');

    const StartPassportCapture = startCapture('PASSPORT');

    const StartSelfieCapture = startCapture('SELFIE');

    const StartGenericDocumentCapture = startCapture('GENERIC_DOCUMENT');

    window.StopGlobalGatewayCapture = Stop;
    window.GlobalGatewayHints = GlobalGatewayHints;
    window.StartDocumentCapture = StartDocumentCapture;
    window.StartBarcodeCapture = StartBarcodeCapture;
    window.StartPassportCapture = StartPassportCapture;
    window.StartSelfieCapture = StartSelfieCapture;
    window.StartGenericDocumentCapture = StartGenericDocumentCapture;
  } catch (e) {
    console.error(e);
  }
}());
