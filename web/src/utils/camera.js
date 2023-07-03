export function base64ToFile(base64Data, fileName = 'photo', mimeType = 'image/jpeg') {
  var byteCharacters = atob(base64Data);
  var byteArrays = [];
  var sliceSize = 1024;
  var offset = 0;

  while (offset < byteCharacters.length) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);
    var byteNumbers = new Array(slice.length);

    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
    offset += sliceSize;
  }

  var file = new File(byteArrays, fileName, { type: mimeType });
  return file;
}
