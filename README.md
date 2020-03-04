# photogram
An instagram style photo sharing social network website.

## Link to deployment
https://nameless-waters-96397.herokuapp.com/

## Design
| **specification** | **tools** |
|-------------|:-----------:|
|Frontend framework|React|
|UI framework|Semantic UI|
|Development environment|Node.js|
|Web server|express|
|Web architecture|REST API|
|Database|MongoDB|

## API
| **CRUD** | **features** | 
|-------------|:-----------:|
|POST|create a new user,post,comment|
|GET|read the landing page, log in form, register form, post page.etc|
|PUT|edit profile,posts,comments|
|DELETE|delete posts,comment|

## Link to Swagger API docs
Source code: https://app.swaggerhub.com/apis/zhaozemin1997/zlz/1.0.0

## app specification
| **US#** | **User Story** |
|---------|:--------------:|
|1|**User registration (0)**<br>there is a "sign up" button to navigate the user to the register page. User can create new account 
|2|**Login/Auth (0)**<br>User can log in/sign up/log out from the home page.when logged in/signned up, username will appear next to the user icon, click the icon should navigate to the profile page.
|3|**User profile page (0)**<br>Users can see their information and recent posts
|4|**Create post/Photo upload (0)**<br>User can upload photos to create a post
|5|**Activity feed (1)**<br>User can see activities such as likes and followers
|6|**Photo likes & unliking (1)**<br>User can like/unlike a post
|7|**Follow/unfollow users (1)**<br>User can follow/unfollow another use
|8|**Comments (2)**<br>Users can comments below each post
|9|**Editing/Deleting Posts (photo) & Comments (2)**<br>User can edit/delete a post/comment
|10|**Follower suggestions (3)**<br>Follower suggestions on user profile page
|11|**Tagging photos/@mentions in comments (3)**<br>User can assign a tag to a photo or a target to another user
|12|**Interactive API documentation using Swagger (3)**<br>User can create/retrieve/update/delete data through API
|13|**Live update/Browser's notification (4)**<br>Notifications can pop up in browsers
|14|**Privacy/Visibility control on photos (4)**<br>User can set the visibility of posts
|15|**Pagination/'infinite scroll' (4)**<br>User can scroll infinitely over all comments
