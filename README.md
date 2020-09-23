<div align='center'>
<h3>Links-API</h3>

---

<a href='#about'>About</a> |
<a href='#technologies'>Technologies</a> |
<a href='#how-to-use'>How to use</a> |
<a href='#Functionalities'>Functionalities</a>

---
</div>

### <p id='about'>📑 About</p>

This project aims to help you store and organize your most important and / or favorite links.

### <P id='technologies'>🖥 Technologies used</p>

This project was built 100% on the express and its good practices, follows the list of dependencies used in this project.

- Nodejs
- Express
- bycript
- uuid
- eslint
- JsonWebToken
- Postgres

### <p id='how-to-use'>⚙️ How to use</p>

#### First clone the project

```shell
$ git clone https://github.com/BrendoSPinheiro/Links-API
```

#### 🔥 Install dependencies

```shell
$ yarn

# or

$ npm install
```
### <p id='Functionalities'>💻 Functionalities</p>
#### LinkManager(back-end) has 8 routes currently and 1 middleware the authentication:

Routes

| Routes       |                                                                                         |
| ------------ | --------------------------------------------------------------------------------------- |
| Create User  | Create user                                                                             |
| Update User  | User update, but for that you need to register, returning a token                       |
| Login        | login, but for that you need to register, returning a token                             |
| Logout        | login, but for that you need to register, returning a token                            |
| Create Link  | Create links, need to be logged in, to create you need to pass the valid id and token   |
| List Links   | List Links, need to be logged in, to list links you need to pass the valid id and token |
| Find Link    | Find Link, need to be logged in, to find link you need to pass the valid id and token   |
| Update Link  | Update Links, need to be logged in, to update link you need to pass the valid id and token |
| Delete Links | Delete Links, need to be logged in, to delete link you need to pass the valid id and token |

<br/>

Middleware

| Middleware   |                                                                                         |
| ------------ | --------------------------------------------------------------------------------------- |
| Auth         | Authenticates users, returning whether they have permission or not, implemented in the routes to create, update, list, find and delete links.                                                                             |

