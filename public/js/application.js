(function(window) {
  var hashtagDisplay, generatorDisplay;

  function flashScreen() {
    $('body').addClass('fade-out');

    setTimeout(function() {
      $('body').removeClass('fade-out');
    }, 500);
  }

  function generateHashtag() {
    //make sure textToConvert is a non-empty string
    if(!!$('#user-input')) {
      textToConvert = $('#user-input').val();
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
      return "#" + capitalCamelCasedString;
    }
  }

  function renderHashtagDisplay() {
    //if hashtagDisplay is undefined or null, build it
    //creating elements that are part of the hashtag display
    var hashtagContainer = $($.parseHTML("<div id='hashtag-container'></div>"));
    var hashtagElement = $($.parseHTML("<h3 id='hashtag'>" + generateHashtag() + "</h3>"));

    var tryAgainButton = $($.parseHTML("<input type='submit' value='Try again?' id='try-again-btn' class='btn'>"));
    tryAgainButton.click(function() {
      flashScreen();
      renderGeneratorDisplay();
    });

    hashtagDisplay = hashtagContainer.append(hashtagElement, tryAgainButton);

    //remove input-wrapper from dom, but keep events that were previously bound to it or its children
    generatorDisplay = $('#input-wrapper').detach();

    $('body > div.wrapper.wrapper--generator').append(hashtagDisplay);
  }

  function renderGeneratorDisplay() {
    var userInput = generatorDisplay.children('#user-input');
    userInput.val("");

    //remove hashtag-container from dom, but keep events that were previously bound to it or its children
    hashtagDisplay = $('#hashtag-container').detach();

    //reset text box contents to empty string before display
    $('body > div.wrapper.wrapper--generator').append(generatorDisplay);
    userInput.focus();
  }

  function generateSubmitFn() {
    flashScreen();
    renderHashtagDisplay();
  }

  $(document).ready(function() {
    $('#user-input').bind("enterKey", generateSubmitFn);

    $('#user-input').keyup(function(e) {
      if(e.keyCode === 13) {
        $(this).trigger("enterKey");
      }
    });

    $('#generate-btn').click(generateSubmitFn);
  });
})(window);
