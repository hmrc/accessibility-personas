(function() {
  if (typeof speechSynthesis === 'undefined') {
    return;
  }
  
  document.onmouseup = function(e) {
    setTimeout(function() {

      speechSynthesis.cancel();

      var selection = window.getSelection();
      var start = selection.anchorOffset;
      var end = selection.focusOffset;
      var speech = selection.baseNode.parentElement.getAttribute("data-speech");

      if (!speech) {
        return;
      }

      var phrase = speech.substring(start, end);
      var utter = new SpeechSynthesisUtterance(phrase);

      speechSynthesis.speak(utter);
    }, 1);
  };

})();