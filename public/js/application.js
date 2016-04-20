var tagList = [];

function createHashtag(){
  var userInput = document.getElementById('userInput').value;
  var hashtag = "#" + userInput.replace(/\s+/g, '').replace(/[^0-9a-z]/gi, '');

  tagList.push(hashtag);
  document.getElementById('hashtags').innerHTML = tagList;
  document.getElementById('userInput').value = '';
  console.log(tagList);

  document.body.className += ' fade-out';
  setTimeout(function() { document.body.className = '' }, 500);
}

// $(window).resize(function() {
//   console.log($('.quote-box').width())
// });
