/* eslint-disable */

var VConsole = require('vconsole')

const isPC = [
  'Mac68K',
  'MacPPC',
  'Macintosh',
  'MacIntel',
  'Win32',
  'Windows',
].includes(window.navigator.platform)

!isPC && window.vConsole === undefined && (window.vConsole = new VConsole())
