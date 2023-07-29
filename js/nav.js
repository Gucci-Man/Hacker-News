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
  console.debug("navAddStory", evt);
  hidePageComponents();
  $addStoryForm.show();
  $allStoriesList.show();
  $favoritedStories.hide();
}

$navAddStory.on("click", navAddStory);

/** Show favorite stories on click on "favorites" */

function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt);
  hidePageComponents();
  putFavoritesListOnPage();
}

$body.on("click", "#nav-favorites", navFavoritesClick);

/** Show My Stories on clicking "my stories" */

function navMyStories(evt) {
  console.debug("navMyStories", evt);
  hidePageComponents();
  putUserStoriesOnPage();
  $ownStories.show();
}

$body.on("click", "#nav-my-stories", navMyStories);

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
  //$addStoryForm.hide();
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $loginForm.hide();
  $signupForm.hide();
  //$navAddStory.show(); // show option to add story 
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** Hide everything but profile on click on "profile" */

function navProfileClick(evt) {
  console.debug("navProfileClick", evt);
  hidePageComponents();
  $userProfile.show();
}

//$navUserProfile.on("click", navProfileClick);


