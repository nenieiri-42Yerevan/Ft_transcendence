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

<br>

- Main route

<br>

| HTTP Verbs | Endpoints      | Action              |
| ---------- | -------------- | ------------------- |
| GET        | /transcendence | To get welcome page |

<br>

- User routes

<br>

| HTTP Verbs | Endpoints                               | Action                                   |
| ---------- | --------------------------------------- | ---------------------------------------- |
| GET        | /transcendence/user                     | To get all the users                     |
| GET        | /transcendence/user/by-id/:id           | To get a user by id                      |
| GET        | /transcendence/user/by-name/:username   | To get a user by username                |
| GET        | /transcendence/user/by-token/:token     | To get a user by session refresh token   |
| GET        | /transcendence/user/:id/avatar          | To get a user's avatar by user id        |
| GET        | /transcendence/user/:id/matches         | To get a user's match history by user id |
| GET        | /transcendence/user/:id/follows         | To get all users followd by another user |
| GET        | /transcendence/user/:id/blocked         | To get all users blocked by another user |
| GET        | /transcendence/user/:id/status          | To get user's status by id               |
| PUT        | /transcendence/user/update-user/:id     | To update a user by id                   |
| PUT        | /transcendence/user/update-password/:id | To update a user password by id          |
| PUT        | /transcendence/user/update-avatar/:id   | To update a user's avatar by id          |
| PUT        | /transcendence/user/follow/:uid/:tid    | To follow/unfollow a user by id          |
| PUT        | /transcendence/user/block/:uid/:tid     | To block/unblock a user by id            |
| POST       | /transcendence/user/signup              | To sign up a new user account            |

<br>

- Auth routes

<br>

| HTTP Verbs | Endpoints                         | Action                             |
| ---------- | --------------------------------- | ---------------------------------- |
| POST       | /transcendence/auth/signin/local  | To login an existing user account  |
| POST       | /transcendence/auth/signin/2FA    | To continue login through 2FA      |
| POST       | /transcendence/auth/signin/2FA_42 | To continue 42 login through 2FA   |
| GET        | /transcendence/auth/signin/42     | To login through 42 API            |
| POST       | /transcendence/auth/TFA_enable    | To enable 2 factor authentication  |
| POST       | /transcendence/auth/TFA_disable   | To disable 2 factor authentication |
| POST       | /transcendence/auth/logout        | To logout                          |
| POST       | /transcendence/auth/refresh       | To get a new pair of tokens        |

<br>

- Chat routes

<br>

| HTTP Verbs | Endpoints                                          | Action                                         |
| ---------- | -------------------------------------------------- | ---------------------------------------------- |
| GET        | /transcendence/chat/user/:id                       | To get all DM chats for a user                 |
| GET        | /transcendence/chat/:id                            | To get a chat by id                            |
| GET        | /transcendence/chat/group                          | To get all the group chats                     |
| GET        | /transcendence/chat/:gid                           | To get a group chat by id                      |
| POST       | /transcendence/chat/create/:uid/:tid               | To create a chat between two users             |
| POST       | /transcendence/chat/group/create/:uid              | To create a group chat between by a user       |
| POST       | /transcendence/chat/message/create/:cid/:uid       | To create a message in a chat by a user        |
| POST       | /transcendence/chat/group/update-pass/:gid/:uid    | To update a group chat password by a user      |
| POST       | /transcendence/chat/group/message/add/:gid/:uid    | To write a message to a group chat by a user   |
| POST       | /transcendence/chat/group/message/add/:gid/:uid    | To write a message to a group chat by a user   |
| POST       | /transcendence/chat/group/add/:uid                 | To add a user to a group chat                  |
| DELETE     | /transcendence/chat/group/delete/:uid/:gid         | To delete a user from a group chat             |
| POST       | /transcendence/chat/group/bann/:uid/:gid:/:adminId | To bann a user from a group chat with an admin |
| POST       | /transcendence/chat/group/unbann                   | To unbann a user given as a Body               |
| POST       | /transcendence/chat/group/mute/:uid/:gid:/:adminId | To mute a user from a group chat with an admin |
| POST       | /transcendence/chat/group/unmute                   | To unmute a user given as a Body               |
| POST       | /transcendence/chat/delete/:uid                    | To delete a user given by id                   |

<br>

### Websocket API Endpoints 🔗

<br>

- Notify WebSocket Route

```
ws://loacalhost:7000/transcendence/notify
```

<br>

- Chat WebSocket Route

```
ws://loacalhost:7000/transcendence/chat
```
