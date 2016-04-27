(function(window) {
  var hashtagDisplay, generatorDisplay;

  function flashScreen() {
    $('body').addClass('fade-out');

    setTimeout(function() {
      $('body').removeClass('fade-out');
    }, 500);
  }

  function convertStringToHashtag(textToConvert) {
    //make sure textToConvert is a non-empty string
    if(!!textToConvert) {
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

  function renderHashtagDisplay(generatedHashtag) {
    //if hashtagDisplay is undefined or null, build it
    if(typeof hashtagDisplay === 'undefined' || !hashtagDisplay) {
      //creating elements that are part of the hashtag display
      var hashtagContainer = $($.parseHTML("<div id='hashtag-container'></div>"));
      var hashtagElement = $($.parseHTML("<h3 id='hashtag'>" + generatedHashtag + "</h3>"));

      var tryAgainButton = $($.parseHTML("<input type='submit' value='Try again?' id='try-again-btn' class='btn'>"));
      tryAgainButton.click(function() {
        flashScreen();
        renderGeneratorDisplay();
      });

      hashtagDisplay = hashtagContainer.append(hashtagElement, tryAgainButton);
    }

    //remove input-wrapper from dom, but keep events that were previously bound to it or its children
    generatorDisplay = $('#input-wrapper').detach();

    $('body > div.wrapper.wrapper--generator').append(hashtagDisplay);
  }

  function renderGeneratorDisplay() {
    //if generatorDisplay is undefined or null, build it
    if(typeof generatorDisplay === 'undefined' || !generatorDisplay) {
      //creating elements that are part of the generator display
      var generatorContainer = $($.parseHTML("<div id='input-wrapper'></div>"));
      var userInput = $($.parseHTML("<input type='text' placeholder='Enter some words' id='user-input'>"));
      var generateButton = $($.parseHTML("<input type='submit' value='Generate' id='generate-btn' class='btn'>"));
      generateButton.click(function() {
        flashScreen();
        renderHashtagDisplay(convertStringToHashtag($('#user-input').val()));
      });

      generatorDisplay = generatorContainer.append(userInput, generateButton);
    }

    //remove hashtag-container from dom, but keep events that were previously bound to it or its children
    hashtagDisplay = $('#hashtag-container').detach();

    //reset text box contents to empty string before display
    generatorDisplay.children('#user-input').val("")
    $('body > div.wrapper.wrapper--generator').append(generatorDisplay);
  }

  $(document).ready(function() {
    $('#generate-btn').click(function() {
      flashScreen();
      renderHashtagDisplay(convertStringToHashtag($('#user-input').val()));
    });
  });
})(window);
