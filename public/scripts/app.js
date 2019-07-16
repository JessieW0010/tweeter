/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

// function takes a tweet object and returns a tweet <article> element containing the entire HTMl structure of the tweet
const createTweetElement = function(obj) {

  const $header = `
      <header class="tweet">
        <span class="tweet-avatar">
          <img src=${obj.user["avatars"]}>
          <p class="tweet-name profile bold">${obj.user["name"]}</p>
        </span>
        <p class="tweet-handle profile bold">${obj.user["handle"]}</p>
      </header>`
  const $p = `<p class="tweet-input bold">${obj.content["text"]}</p>`;
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

  for (let tweet of tweets) {
    console.log(createTweetElement(tweet));
    $('#tweets-container').append(createTweetElement(tweet));
  }
}

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

renderTweets(data);

});