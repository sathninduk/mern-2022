# Surge Global Assignment

## Deployed live preview
Netlify: [https://surge-buddhi.netlify.app](https://surge-buddhi.netlify.app)



## clone or download
```terminal
$ git clone https://github.com/BuddhiPerera/Surge_Global_Internship_Assignment
```

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
### Prepare your secret - client

rename **.env.example** file as **.env** and specify your 
```terminal
REACT_APP_API_URL
```
### Installation and start - client
```terminal
$ cd client   // go to client folder
$ npm i       // npm install packages
$ npm start   // run it locally

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

### Installation and start - server

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm start   // run it locally
```

## Database seed file (MongoDB)
### Insert admin user to the database
Use **seed.json** file at the root directory as your database seed file.

## Admin user
Email: admin@admin.com
Password: admin123

## Author
Buddhi Perera

### License
[MIT](https://github.com/amazingandyyy/mern/blob/master/LICENSE)
