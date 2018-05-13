var quote, author, background, imageIndex = 0;

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
    'https://preview.ibb.co/m91X6a/Jason_Statham_Transparent_Background.png',
    'https://preview.ibb.co/iAbksF/Jason_Statham_PNG_File.png',
    'https://image.ibb.co/n2PGzv/28_jstatham_silo_250x375.png',
    'https://image.ibb.co/hzKYev/Jason_Statham_PNG_Transparent_Image.png'
  ];
  if(imageIndex > images.length - 1) {
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
      $('.image').css('backgroundImage', 'url('+ background +')');
      $(this).animate({opacity: 1}, 400);
      $('.fa-twitter').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + quote + '" ' + author));
      $('.fa-tumblr').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(author)+'&content=' + encodeURIComponent(quote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
  });
}

$(document).ready(function() {
  findQuote();
  
  $('.quote__refresh button').click(findQuote);
  
});
