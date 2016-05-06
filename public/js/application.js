(function(window) {
  var hashtagDisplay, generatorDisplay, confettiTimerID;

  function flashScreen() {
    $('body').addClass('fade-out');

    setTimeout(function() {
      $('body').removeClass('fade-out');
    }, 500);
  }

  function generateHashtag() {
    //make sure textToConvert is a non-empty string
    if(!!$('#user-input')) {
      var textToConvert = $('#user-input').val();

      var splitTextToConvert, capitalCamelCasedString;
      var capitalizedWords = [];

      //strip any #'s if there happen to be any
      textToConvert = textToConvert.replace(/#/g,  '');

      //split space-delimited string into a collection of individual words
      splitTextToConvert = textToConvert.split(' ');
      //iterate through each element (word), capitalize the first character,
      //then push it on to end of capitalizedWords array
      for(var i = 0; i < splitTextToConvert.length; i++) {
        var word = splitTextToConvert[i];

        word = word.substr(0, 1).toUpperCase() + word.substring(1).toLowerCase();
        capitalizedWords.push(word);
      }

      //turn collection of capitalized words into a single string
      capitalCamelCasedString = capitalizedWords.join('');

      //prepend an octothorpe to capitalCamelCasedString and return it
      var finalHashtag = "#" + capitalCamelCasedString;

      $('#hashtag').text(finalHashtag);
    }
  }

  function showHashtagDisplay() {
    var hashtagElement = $('#hashtag');
    var button = $('#main-btn');

    flashScreen();

    window.confetti.start();
    $('#confetti').show();

    confettiTimerID = setTimeout(function() {
      $('#confetti').hide();
      window.confetti.stop();
    }, 4000);

    if (button.prop('value') == 'Generate') {
      button.prop('value', 'Try again?');
      $('#user-input').css('visibility', 'hidden');
      generateHashtag();
      hashtagElement.css('visibility', 'visible');
    } else {
      $('#confetti').hide();
      window.confetti.stop();
      button.prop('value', 'Generate');
      $('#user-input').css('visibility', 'visible');
      hashtagElement.css('visibility', 'hidden');
      $('#user-input').val('');
      clearTimeout(confettiTimerID);
    };
  }

  $(document).ready(function() {
    $('#main-btn').click(showHashtagDisplay);
  });
})(window);
