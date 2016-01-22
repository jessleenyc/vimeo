angular.module('VimeoApp', []).config(function($sceProvider) {
  //now we don't need to convert strings to html
   [$sceProvider.enabled(false)]
 });
