$(document).ready(function() {
  $("#tweet-text").keyup(function() {
    // this.value gives the value typed into the textarea MINUS the most recent one
    let length = $(this).val().length;
    let counter = 140;
    if (counter - length < 0) {
      $(".counter").css("color", "red");
    }
    $(".counter").text(counter - length);
  });
});