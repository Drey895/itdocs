export function getReadableFileSizeString(fileSizeInBytes) {
  var i = -1;
  var byteUnits = [" kB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"];
  do {
    fileSizeInBytes /= 1000;
    i++;
  } while (fileSizeInBytes > 1000);

  return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}
