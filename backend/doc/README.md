# REST API Doc

This doc is for the API of our project "HMPT (matcha)".

## Open Endpoints

Open endpoints require no Authentication.

* Register : `POST /register`
* Verify account: `POST /verify_account`
* Login : `POST /login`
* Reset password : `POST /reset_password`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header (or in Cookies) of the request. A Token can be acquired from the Login view above.

### User related routes

#### Connected user routes
* Get connected user : `GET /me`
* Update connected user : `UPDATE /me`
* Profile views : `GET /me/views`
* Likes : `GET /me/likes`
* Get interesting profiles `GET /me/interesting_profiles`

#### Other users routes
* Get user : `GET /user/:userId`
* Like a user : `POST /user/like/:userId`
* Report a user : `POST /user/report/:userId`
* Block a user : `POST /user/block/:userId`

#### Chat
* Send message : `POST /chat/:chatId`



