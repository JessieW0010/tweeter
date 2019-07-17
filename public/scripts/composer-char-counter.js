$(document).ready(function() {
  $("#tweet-text-area").keyup(function() {
    let length = $(this).val().length;
    let counter = 140;
    if (counter - length < 0) {
      $(".counter").css("color", "red");
    }
    $(".counter").text(counter - length);
  });
});