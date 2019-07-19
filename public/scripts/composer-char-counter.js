// function checks for keyup event (user typing into textarea) and updates the text to the counter element
$(document).ready(function() {
  $("#tweet-text-area").keyup(function() {
    let length = $(this).val().length;
    let counter = 140;
    if (counter - length < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "#9D8189");
    }
    $(".counter").text(counter - length);
  });
});