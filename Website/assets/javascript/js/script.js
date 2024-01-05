const getViewportWidth = () =>
  window.innerWidth || document.documentElement.clientWidth();
//let ausgabe = "Die Viewport-Breite beträgt: " + getViewportWidth() + " Pixel.";
const ausgabe = `Die Viewportbreite beträgt: ${getViewportWidth()} Pixel`;
console.log(ausgabe);
