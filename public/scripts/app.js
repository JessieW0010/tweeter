/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
// function takes a tweet object and returns a tweet <article> element containing the entire HTMl structure of the tweet

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function(obj) {

  const $header = `
      <header class="tweet">
        <span class="tweet-avatar">
          <img src=${obj.user["avatars"]}>
          <p class="tweet-name profile bold">${obj.user["name"]}</p>
        </span>
        <p class="tweet-handle profile bold">${obj.user["handle"]}</p>
      </header>`
  const $p = `<div class="tweet-input bold">${escape(obj.content["text"])}</div>`
  const $footer = `
      <footer>
        <p class="tweet-days bold">${obj.created_at}</p>
        <div class="tweet-icons">
          <a><img src="https://image.flaticon.com/icons/svg/149/149804.svg" alt="flag"></a>
          <a><img src="https://image.flaticon.com/icons/svg/3/3890.svg" alt="retweet"></a>
          <a><img src="https://image.flaticon.com/icons/svg/4/4458.svg" alt="like"></a>
        </div>
      </footer>`;

  return `
    <article>
      ${$header}
      ${$p}
      ${$footer}
    </article>`

}

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $('#tweets-container').empty();

  for (let tweet of tweets) {
    $('#tweets-container').prepend(createTweetElement(tweet));
  }
}

const loadTweets = function() {
  $.ajax("/tweets", {
    method: "GET", 
    success: function(response) {
      renderTweets(response);
    }
  })
}

$("#tweet-text").on("submit", function(event) {
  event.preventDefault();
  const data = $(this).serialize();
  if (!data.slice(5)) {
    $("#alert-container").css("display", "inherit");
    $(".error-message").text("You didn't write anything!");
  } else if (data.slice(5).length > 140) {
    $("#alert-container").css("display", "inherit");
    $(".error-message").text("Your tweet is over 140 characters!");
  } else {
    $.ajax("/tweets", {
    method: "POST", 
    data, 
    success: function() {
      // empty text area if successful
      // hide error if there is not error
      $("#tweet-text-area").val("");
      $("#alert-container").css("display", "none");
      loadTweets();
    }
    })
  }
})

$(".toggle-btn").on("click", function() {
  $(".new-tweet").slideToggle();
})


// When user scrolls down 120px fromt he top fo the document, show button
$(document).on("scroll", function() {
  if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
    $("#scroll-up-btn").css("display", "block");
  } else {
    $("#scroll-up-btn").css("display", "none");
  }
});

$("#scroll-up-btn").on("click", function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})

})