(function () {
  const that = {};
  const sizeOfMegabyteInBytes = 1024 ** 2;
  const sizeLimitForFileUploadInMB = 4; // 4 MB cap, if changing please replace all '4's in the file

  that.sizeLimitForFileUpload = sizeOfMegabyteInBytes * sizeLimitForFileUploadInMB;

  that.errorTable = {
    IMAGE_SMALLER_THAN_MIN_SIZE: { code: 1001, type: 'IMAGE_SMALLER_THAN_MIN_SIZE' },
    CORRUPT_IMAGE: { code: 1002, type: 'CORRUPT_IMAGE' },
    FILE_TYPE_INVALID: { code: 1003, type: 'FILE_TYPE_INVALID' },
    PDF_FILE_SIZE_OVER_4_MB: { code: 1004, type: 'PDF_FILE_SIZE_OVER_4_MB' },
  };

  that.isPDFFileSizeValid = (file) => {
    if (file.type === 'application/pdf' && file.size > that.sizeLimitForFileUpload) {
      return that.errorTable.PDF_FILE_SIZE_OVER_4_MB;
    }
    return null;
  };

  that.isFileTypeValid = (file) => {
    const validTypes = { jpg: 'image/jpeg', png: 'image/png', pdf: 'application/pdf' };

    if (!Object.values(validTypes).includes(file.type)) {
      return that.errorTable.FILE_TYPE_INVALID;
    }
    return null;
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      // eslint-disable-next-line no-multi-assign
      exports = module.exports = that;
    }
    exports.sdkErrors = that;
  } else {
    window.sdkErrors = that;
  }
}());
