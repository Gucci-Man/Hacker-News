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
 * Returns the markup for the story along with a favorites button
 */

function generateStoryMarkup(story, showDeleteBtn = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  // if a user is logged in, show favorite/not-favorite star
  const showStar = Boolean(currentUser);

  return $(`
      <li id="${story.storyId}">
        <div>
        ${showDeleteBtn ? getDeleteBtnHTML() : ""}
        ${showStar ? getStarHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <div class="story-author">by ${story.author}</div>
        <div class="story-user">posted by ${story.username}</div>
        </div>
      </li>
    `);
}

/** Make delete button HTML for story */

function getDeleteBtnHTML() {
  return `
      <span class='trash-can'>
        <i class='fas fa-trash-alt'></i>
      </span>`
}

/** Make star as favorites button for story selection */

function getStarHTML(story, user) {
  const isFavorite = user.isFavorite(story);
  const starType = isFavorite ? "fas" : "far";
  return `
      <span class='star'>
        <i class='${starType} fa-star'></i>
      </span>`;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    console.dir(story);
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Handle deleting a story */

async function deleteStory(evt) {
  console.debug("deleteStory");

  const $closestLi = $(evt.target).closest("li");
  const storyId = $closestLi.attr("id");

  await storyList.removeStory(currentUser, storyId);

  // re-generate story list
  await putStoriesOnPage();
}

$ownStories.on("click", ".trash-can", deleteStory);

/** This should get data from the form, call the .addStory method
 * and then put that new story on the page. 
 */

async function submitStoryForm(evt) {
  evt.preventDefault();
  console.debug("submitStoryForm", evt);

  // capture info from form
  const author = $("#add-story-author").val();
  const title = $("#add-story-title").val();
  const url = $("#add-story-url").val();

  const storyObj = {title, author, url};

  // clear out text inputs 
  $("#add-story-author").val('');
  $("#add-story-title").val('');
  $("#add-story-url").val('');

  const story = await storyList.addStory(currentUser, storyObj);

  const $story = generateStoryMarkUp(story);
  $allStoriesList.prepend($story);

  
  
}

$addStoryForm.on('submit', submitStoryForm);