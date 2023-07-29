# Hacker News

Primary authors:
- Michael Hueter: initial creation, 2018
- Elie Schoppik: refactoring using OO, 2019
- Joel Burton: refactored and componentized, 2020
- Adel Ngo: Added submit, favorite and remove functions and updated UI, 2023

This is a clone version of the popular Hacker News website.

The website will display a list of stories that when clicked on will send the user to the designated web site. A user is able to create
an account and submit new stories. They are also able to 'star' or 'unstar' stories to favorite them. A user can log out and log back in and still be 
able to see the stories they have submitted and the stories that are their favorites. 

Logged-in users can also remove any previous stories that they have submitted. (Please note that the API may respond with a Status 404 error which can 
result in stories that have been deleted or favorited to be displayed even though they should not be)
