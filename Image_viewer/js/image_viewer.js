var request;                         // Latest image to be requested
var $current;                        // Image currently being shown
var cache = {};                      // Cache object
var $frame = $('#photo-viewer');     // Container for image
var $thumbs = $('.thumb');           // Thumbnails

function bringin($img){

if($current)
{
  $current.fadeOut('slow');
  // $img.fadeOut();
}
// $img.css({                         // Set the CSS margins for the image
//   marginLeft: -$img.width() / 2,   // Negative margin of half image's width
//   marginTop: -$img.height() / 2    // Negative margin of half image's height
// });
$img.fadeTo('slow', 2);
// $img.stop().fadeTo('slow', 1);
$current = $img;

}

$(document).on('click', '.thumb', function(e){
var $img, src=this.href;
request=src;
e.preventDefault();
$thumbs.removeClass('active');
$(this).addClass('active');

$('.description').children().hide();
var thumbindex= $(this).index();
console.log(thumbindex);
switch (thumbindex) {
  case 0:
    $('#dishonored').fadeIn(1000);
    break;
    case 1:
      $('#dishonored2').fadeIn(1000);
      break;
      case 2:
        $('#dishonoreddoo').fadeIn(1000);
        break;
  default:
    break;
}
if (cache.hasOwnProperty(src)) {        // If cache contains this image
  if (cache[src].isLoading === false) { // And if isLoading is false
    bringin(cache[src].$img);         // Call crossfade() function
  }
}
else {
  $img = $('<img/>');
  cache[src]={
    $img:$img,
    isLoading:true};

    $frame.addClass('is-loading');
$img.hide();
    $img.attr({                           // Set attributes on <img> element
      'src': src,                         // Add src attribute to load image
      'alt': this.title || ''             // Add title if one was given in link
    });

    $img.on('load',function(){
      cache[src].isLoading = false;
      $frame.removeClass('is-loading').append($img);
      if(request === src){
        bringin($img);
      }
        });
}});
// Final line runs once when rest of script has loaded to show the first image
$('.thumb').eq(0).click();                // Simulate click on first thumb
