import { extname } from "path";

var options: RequestInit = {
  method: "GET",
  cache: "default",
};

function arrayBufferToBase64(buffer: ArrayBuffer) {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));

  bytes.forEach((b) => (binary += String.fromCharCode(b)));

  return window.btoa(binary);
}

const fetchBlob = (url: string) =>
  fetch(new Request(url), options)
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      let imageType = extname(url).slice(1);
      if (imageType === "svg") imageType += "+xml";
      var base64Flag = `data:image/${imageType};base64,`;
      var imageStr = arrayBufferToBase64(buffer);

      return `${base64Flag}${imageStr}`;
    });

export default fetchBlob;
