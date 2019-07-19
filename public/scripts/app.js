/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Escape() function refactors the user input from the text area
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createdAt = function(time) {
    const timeDiff = Date.now() - time;
    if (timeDiff >= 31556952000) {
      return `${Math.floor(timeDiff / 31556952000)} years`;
    } else if (timeDiff >= 2592000000) {
      return `${Math.floor(timeDiff / 2592000000)} months`;
    } else if (timeDiff >= 604800000) {
      return `${Math.floor(timeDiff / 604800000)} weeks`;
    } else if (timeDiff >= 86400000) {
      return `${Math.floor(timeDiff / 86400000)} days`;
    } else if (timeDiff >= 3600000) {
      return `${Math.floor(timeDiff / 3600000)} hours`;
    } else if (timeDiff >= 60000) {
      return `${Math.floor(timeDiff / 60000)} minutes`;
    } else {
      return `${Math.floor(timeDiff / 1000)} seconds`;
    }
  }

  // createTweetElement() takes in a tweet object and returns the formatted HTML to be appended onto the tweets-container
  const createTweetElement = function(obj) {
    const $header = `
        <header class="tweet">
          <span class="tweet-avatar">
            <img src=${obj.user["avatars"]}>
            <p class="tweet-name profile bold">${obj.user["name"]}</p>
          </span>
          <p class="tweet-handle profile bold">${obj.user["handle"]}</p>
        </header>`;
    const $p = `<div class="tweet-input bold">${escape(obj.content["text"])}</div>`;
    const $footer = `
        <footer>
          <p class="tweet-days bold">${createdAt(obj.created_at)} ago</p>
          <div class="tweet-icons">
            <a><img src="/images/flag.png" alt="flag"></a>
            <a><img src="/images/retweet-arrows.png" alt="retweet"></a>
            <a><img src="/images/favorite-heart-button.png" alt="like"></a>
          </div>
        </footer>`;

    return `
      <article>
        ${$header}
        ${$p}
        ${$footer}
      </article>`;
  }

  // renderTweets() function takes in an array of tweet objects, passes each object to createTweetElement() function and appends each to the tweets-container div
  // function first empties the tweets-container html
  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (let tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  };

  // loadTweets() renders the tweets if the GET request was successful
  const loadTweets = function() {
    $.ajax("/tweets", {
      method: "GET", 
      success: function(response) {
        renderTweets(response);
      }
    })
  };

  // When the textarea value is submitted, and the value in the textarea passes the error tests and the POST request is successful, the function empties the text area (and error message if there is one), and calls loadTweets function
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
        $(".counter").text(140);
        $("#alert-container").css("display", "none");
        loadTweets();
      }
      });
    }
  });

  // When the button is clicked, the new-tweet div is toggled
  $(".toggle-btn").on("click", function() {
    $(".new-tweet").slideToggle();
  });


  // When user scrolls down 120px from the top of the document, the scroll up button will appear
  $(document).on("scroll", function() {
    if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
      $("#scroll-up-btn").css("display", "block");
    } else {
      $("#scroll-up-btn").css("display", "none");
    }
  });

  // When the scroll up button is pressed, the user is brought to the top of the document
  $("#scroll-up-btn").on("click", function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

})