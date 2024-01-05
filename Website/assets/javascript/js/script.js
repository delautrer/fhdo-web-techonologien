const getViewportWidth = () =>
  window.innerWidth || document.documentElement.clientWidth();
let ausgabe = "Die Viewport-Breite beträgt: " + getViewportWidth() + " Pixel.";
console.log(ausgabe);
