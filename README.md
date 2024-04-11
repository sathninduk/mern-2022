# MERN Auth Framework 2022 by Sathnindu

## clone or download
```terminal
$ git clone https://github.com/sathninduk/mern.git ./mern
```

## Prerequisites
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Node](https://nodejs.org/en/download/) (Recommended version: The latest LTS)
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
### Prepare your secret - client

rename **.env.example** file as **.env** and specify your API URL (http://localhost:4000/)
```terminal
REACT_APP_API_URL
```
### Installation and start - client
```terminal
$ cd client                     // go to client folder
$ npm i --legacy-peer-dep       // npm install packages (flag to fix mui version conflicts)
$ npm start                     // run it locally

// client build
$ npm run build
$ serve -s build
```

## Server-side usage(PORT: 4000)

### Prepare your secret - server

rename **.env.example** file as **.env** and specify the following variables there,

```terminal
CORS_URL
MONGO_URI
JWT_SECRET

# Google OAuth2 Keys - to send emails
GOOGLE_API_SERVICE
GOOGLE_API_TYPE
GOOGLE_API_USER
GOOGLE_API_CLIENT_ID
GOOGLE_API_CLIENT_SECRET
GOOGLE_API_REDIRECT_URL
GOOGLE_API_REFRESH_TOKEN
```

How to obtain new Google API Variables: [Watch](https://youtu.be/-rcRf7yswfM)

### Installation and start - server

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm start   // run it locally
```

## Database seed file (MongoDB)
### Insert admin user to the database
Use **seed.json** file at the root directory as your database seed file to add admin user record to the **users** collection.

**Step 1**
\
Create database **mern**

**Step 2**
\
Create collection **users**

**Step 3**
\
Import **seed.json** to the users collection

**Summary**
\
**Database:** mern, **Collection:** users, **Seed file:** seed.json

## Admin user
**Email: admin@admin.com**
\
**Password: admin123**

## Contributors
- [Sathnindu Kottage](https://github.com/sathninduk)
- [Buddhi Perera](https://github.com/buddhiPerera)

## License
This project is licensed under the MIT License
