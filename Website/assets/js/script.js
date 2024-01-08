const getViewportWidth = () =>
  window.innerWidth || document.documentElement.clientWidth();
console.log(`Die Viewportbreite beträgt: ${getViewportWidth()} Pixel`);
