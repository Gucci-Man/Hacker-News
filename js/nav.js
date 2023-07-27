"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $addStoryForm.hide();
}

$body.on("click", "#nav-all", navAllStories);

/** When user clicks the submit link, it takes them to a form to add a story */

function navAddStory(evt) {
  console.debug("navAddStory");
  hidePageComponents();
  $addStoryForm.show();
}

$navAddStory.on("click", navAddStory);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $addStoryForm.hide();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $addStoryForm.hide();
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $loginForm.hide();
  $signupForm.hide();
  $navAddStory.show(); // show option to add story 
  $navUserProfile.text(`${currentUser.username}`).show();
}


