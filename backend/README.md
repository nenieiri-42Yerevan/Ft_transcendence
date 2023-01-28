## ft_transcendence API

<br>

### Introduction ⭐

ft_transcendence is an open source platform that enable users to play pong and interact with each other with with the hopes \
of connecting with other users equally interested in the game and having fun.

<br>

### Platform Features 🕹️

People who use the platform can perform the following actions:

- Users can signup and login to their accounts
- Users can play pong with the computer or other users
- Users can challenge other users
- Users can have chats and even create groups
- Authenticated users can access all causes as well as create a new cause, edit their created cause and also
  delete what they've created.

... and much more.

<br>

### Installation Guide ⚙️

To be witten...

<br>

### Usage 🛠️

- Run `npm run start:dev` to start the application.
- Connect to the API using Postman on port 7000.

<br>

### API Endpoints 🔗

| HTTP Verbs | Endpoints                  | Action                            |
| ---------- | -------------------------- | --------------------------------- |
| GET        | /transcendence/            | The welcome page                  |
| POST       | /transcendence/user/signup | To sign up a new user account     |
| POST       | /transcendence/auth/login  | To login an existing user account |
| GET        | /transcendence/home        | The dashboard of the user         |
