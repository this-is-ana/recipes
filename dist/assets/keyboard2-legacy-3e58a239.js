System.register([],(function(e,t){"use strict";return{execute:function(){
/*!
       * (C) Ionic http://ionicframework.com - MIT License
       */
var t=e("KEYBOARD_DID_OPEN","ionKeyboardDidShow"),i=e("KEYBOARD_DID_CLOSE","ionKeyboardDidHide"),n={},o={},r=!1,a=(e("resetKeyboardAssist",(function(){n={},o={},r=!1})),e("startKeyboardAssist",(function(e){a(e),e.visualViewport&&(o=y(e.visualViewport),e.visualViewport.onresize=function(){g(e),u()||f(e)?s(e):c(e)&&d(e)})})),function(e){e.addEventListener("keyboardDidShow",(function(t){return s(e,t)})),e.addEventListener("keyboardDidHide",(function(){return d(e)}))}),s=e("setKeyboardOpen",(function(e,t){h(e,t),r=!0})),d=e("setKeyboardClose",(function(e){p(e),r=!1})),u=e("keyboardDidOpen",(function(){var e=(n.height-o.height)*o.scale;return!r&&n.width===o.width&&e>150})),f=e("keyboardDidResize",(function(e){return r&&!c(e)})),c=e("keyboardDidClose",(function(e){return r&&o.height===e.innerHeight})),h=function(e,i){var n=i?i.keyboardHeight:e.innerHeight-o.height,r=new CustomEvent(t,{detail:{keyboardHeight:n}});e.dispatchEvent(r)},p=function(e){var t=new CustomEvent(i);e.dispatchEvent(t)},g=e("trackViewportChanges",(function(e){n=Object.assign({},o),o=y(e.visualViewport)})),y=e("copyVisualViewport",(function(e){return{width:Math.round(e.width),height:Math.round(e.height),offsetTop:e.offsetTop,offsetLeft:e.offsetLeft,pageTop:e.pageTop,pageLeft:e.pageLeft,scale:e.scale}}))}}}));