// For the subsequent selection of images
var imageIndex = 0;

// prefix for images
var imageDest = 'assets/img/';

function findQuote() {
  $.ajax({
    headers: {
      "X-Mashape-Key": "8mEsbp7Lnqmsh7I3BqIvn25M2W9Up12slEtjsnhRcGH8uTAGNN",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1',
    success: function(data) {
      animation(data);
    },
    error: function(e){
      console.log('error: ' + e);
    }
  });
}

function getBackground() {
  var images = [
    'jason-1.png',
    'jason-2.png',
    'jason-3.png',
    'jason-4.png',
  ];

  if (imageIndex > images.length - 1) {
    imageIndex = 0;
  }

  return images[imageIndex++];
}

function animation(data) {
  quote = data[0].quote;
  author = data[0].author;
  background = getBackground();
  $('.quoter').animate({opacity: 0}, 400, function() {
      $('.quote__text').text(quote);
      $('.quote__author--fake').text('(' + author + ')');
      $('.image').css('backgroundImage', 'url('+ imageDest + background +')');
      $(this).animate({opacity: 1}, 400);
      $('.fa-twitter').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + quote + '" ' + author));
      $('.fa-tumblr').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(author)+'&content=' + encodeURIComponent(quote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
  });
}

$(document).ready(function() {
  // findQuote();
  
  $('.quote__refresh button').click(findQuote);
});
