export function downloadFile(dirEntry, fileUrl, fileName) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', fileUrl, true);
  xhr.responseType = 'blob';
  console.log(dirEntry, fileUrl, fileName, 'fileUrl');
  xhr.onload = function () {
    if (this.status == 200) {
      var blob = new Blob([this.response], { type: 'image/png' });
      saveFile(dirEntry, blob, fileName);
    }
  };
  xhr.send();
}

function saveFile(dirEntry, fileData, fileName) {
  dirEntry.getFile(
    fileName,
    { create: true, exclusive: false },
    function (fileEntry) {
      writeFile(fileEntry, fileData);
    },
    error => {
      console.log(error, 'error');
    }
  );
}

function writeFile(fileEntry, dataObj, isAppend) {
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function (fileWriter) {
    fileWriter.onwriteend = function () {
      console.log('Successful file write...');
    };

    fileWriter.onerror = function (e) {
      console.log('Failed file write: ' + e.toString());
    };

    fileWriter.write(dataObj);
  });
}
