"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <label class="add-fav">
          <input type="checkbox" />
          <i class="icon-heart">
            <i class="icon-plus-sign"></i>
          </i>
        </label>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    console.log($story[0].innerHTML);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** This should get data from the form, call the .addStory method
 * and then put that new story on the page. 
 */

async function submitStoryForm(evt) {
  evt.preventDefault();
  console.debug("submitStoryForm", evt);

  let author = $("#add-story-author").val();
  let title = $("#add-story-title").val();
  let url = $("#add-story-url").val();

  const storyObj = {title, author, url};

  // clear out text inputs 
  $("#add-story-author").val('');
  $("#add-story-title").val('');
  $("#add-story-url").val('');

  await StoryList.addStory(currentUser, storyObj);
  // update storylist so when calling putStoriesOnPage it will show
  storyList = await StoryList.getStories();

  alert('Story added!');
  
}

$addStoryForm.on('submit', submitStoryForm);