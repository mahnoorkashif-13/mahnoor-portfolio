// Scales the 1366px design to the width of the browser window.
(function () {
  var page = document.getElementById("page");
  var frame = document.getElementById("frame");
  var HEIGHT = 9841, WIDTH = 1366;
  function fit() {
    var s = document.documentElement.clientWidth / WIDTH;
    page.style.transform = "scale(" + s + ")";
    frame.style.height = HEIGHT * s + "px";
  }
  window.addEventListener("resize", fit);
  fit();
})();
