var VConsole = require('vconsole');

if (!window.ResizeObserver) {
  let ResizeObserver = require('resize-observer-polyfill').default;
  window.ResizeObserver = window.ResizeObserver || ResizeObserver;
}


window.vConsole === undefined && (window.vConsole = new VConsole());
window.VConsole === undefined && (window.VConsole = VConsole);
