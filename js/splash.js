var element = document.getElementById("splashImage");
element.addEventListener("mousewheel", MouseWheelHandler, false);
element.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
function MouseWheelHandler(e) {
      document.getElementById("clickScroll").checked = true;
      return false;
}
