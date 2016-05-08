(function(window) {
  var hashtagDisplay, generatorDisplay, confettiTimerID;

  function flashScreen() {
    $('body').addClass('fade-out');

    setTimeout(function() {
      $('body').removeClass('fade-out');
    }, 500);
  }

  function generateHashtag(text) {
    //make sure textToConvert is a non-empty string
    if(text) {
      var textToConvert = text;

      var splitTextToConvert, capitalCamelCasedString;
      var capitalizedWords = [];

      //strip any #'s if there happen to be any
      textToConvert = textToConvert.replace(/#/g,  '');

      //split space-delimited string into a collection of individual words
      splitTextToConvert = textToConvert.split(' ');
      //iterate through each element (word), capitalize the first character,
      //then push it on to end of capitalizedWords array
      for (var i = 0; i < splitTextToConvert.length; i++) {
        var word = splitTextToConvert[i];

        word = word.substr(0, 1).toUpperCase() + word.substring(1).toLowerCase();
        capitalizedWords.push(word);
      }

      //turn collection of capitalized words into a single string
      capitalCamelCasedString = capitalizedWords.join('');

      //prepend an octothorpe to capitalCamelCasedString and return it
      var finalHashtag = "#" + capitalCamelCasedString;
      return finalHashtag;
    }
  }

  function runAction() {
    $('#user-input').val() ? showHashtagDisplay() : showError();
  }

  function showError() {
    $('#user-input').addClass('error');
  }

  function showHashtagDisplay() {
    var hashtagElement = $('#hashtag');
    var button = $('#main-btn');
    var input = $('#user-input');
    var myConfetti = $('#confetti');

    //restore to default state
    input.removeClass('error');
    clearTimeout(confettiTimerID);
    myConfetti.css('opacity', 1);
    flashScreen();

    window.confetti.start();
    myConfetti.show();

    confettiTimerID = setTimeout(function() {
      myConfetti.animate({
        opacity: 0
      }, 1000, function() {
        myConfetti.hide();
        window.confetti.stop();
      });
    }, 4000);

    if (button.prop('value') == 'Generate') {
      button.prop('value', 'Try again?');
      input.css('visibility', 'hidden');

      $('#hashtag').text(generateHashtag(input.val()));
      hashtagElement.css('visibility', 'visible');
    } else {
      myConfetti.hide();
      window.confetti.stop();

      button.prop('value', 'Generate');
      input.css('visibility', 'visible');
      hashtagElement.css('visibility', 'hidden');
      input.val('');
    };
  }

  $(document).ready(function() {
    var input = $('#user-input');

    input.val('');
    input.bind('enterKey', runAction);
    input.keydown(function(e) {
      if(e.keyCode === 13) {
        $(this).trigger('enterKey');
      }
    });

    $('#main-btn').click(runAction);
  });
})(window);
