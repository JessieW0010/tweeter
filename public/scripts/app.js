/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* 
<article>
          <header class="tweet">
            <span>
                <img src="images/profile-hex.png">
                <h3>Superlongname</h3>
            </span>
            <h3 id="handle">@Handle</h3>
          </header>
          <p class="tweet-input"> Tweet </p>
          <footer>
            <h6 class="tweet days-ago">x days ago</h6>
            <div class="tweet-icons">
              <a><img src="https://image.flaticon.com/icons/svg/149/149804.svg" alt="flag"></a>
              <a><img src="https://image.flaticon.com/icons/svg/3/3890.svg" alt="retweet"></a>
              <a><img src="https://image.flaticon.com/icons/svg/4/4458.svg" alt="like"></a>
            </div>
          </footer>
   </article> 
*/

// function takes a tweet object and returns a tweet <article> element containing the entire HTMl structure of the tweet
const createTweetElement = function(obj) {
  const $tweet = $("<article>").append(
    $(`<header class="tweet">`).append(
      $(`<span>`).append(
        $(`<img src="images/profile-hex.png">
        <h3>Superlongname</h3>`)
      )
    )
  )
}
