(function(window) {
  var confettiTimerID;

  function animateQuoteBoxes() {
    var wScroll = $(this).scrollTop();
    var genHeight = $('.wrapper--generator').outerHeight();

    //animate quote boxes in when scroll reaches certain point
    var scrollPosition = genHeight == 492 ? 220 : 170;

    $('.quote-box').each(function() {
      if(wScroll >= scrollPosition) {
        $(this).addClass('pop-down');
      }

      scrollPosition = scrollPosition + 270;
    });
  }

  function animateConfettiCanvas(confettiCanvas) {
    confettiCanvas.animate({
      opacity: 0
    }, 1000, function() {
      confettiCanvas.hide();
      window.confetti.stop();
    });
  }

  function flashScreen() {
    var body = $('body');

    body.addClass('fade-out');

    setTimeout(function() {
      body.removeClass('fade-out');
    }, 500);
  }

  function flashError() {
    var input = $('#user-input');

    input.addClass('error');

    setTimeout(function() {
      input.removeClass('error');
    }, 250);
  }

  function generateHashtag(text) {
    //make sure text is a non-empty string
    if(!!text) {
      var splitTextToConvert;
      var capitalizedWords = [];

      //strip any #'s if there happen to be any, then split
      //space-delimited string into a collection of individual words
      splitTextToConvert = text.replace(/#/g, '').split(' ');

      //iterate through each element (word), capitalize the first character,
      //then push it on to end of capitalizedWords array
      for(var i = 0; i < splitTextToConvert.length; i++) {
        var word = splitTextToConvert[i];

        word = word.substr(0, 1).toUpperCase() + word.substring(1).toLowerCase();
        capitalizedWords.push(word);
      }

      //prepend an octothorpe to the result of joined capitalizedWords array
      return "#" + capitalizedWords.join('');
    }
  }

  function runAction() {
    $('#user-input').val() ? showHashtagDisplay() : flashError();
  }

  function showHashtagDisplay() {
    var hashtagElement = $('#hashtag');
    var button = $('#main-btn');
    var input = $('#user-input');
    var myConfetti = $('#confetti');

    //restore to default state
    clearTimeout(confettiTimerID);
    myConfetti.css('opacity', 1);
    flashScreen();

    window.confetti.start();
    myConfetti.show();

    confettiTimerID = setTimeout(function() {
      animateConfettiCanvas(myConfetti);
    }, 4000);

    if(button.prop('value') === 'Generate') {
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
      input.focus();
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

    $(window).scroll(animateQuoteBoxes);
  });
})(window);
