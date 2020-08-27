const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./util/fbAuth')

const { getAllListings, postOneListing } = require('./handlers/listings')
const { signup, login, uploadUserImage, addUserDetails, getAuthenticatedUser } = require('./handlers/users')




// Listing routes

app.get('/listings', getAllListings)
app.post('/listing', FBAuth, postOneListing)  


// Users routes

app.post('/signup', signup)
app.post('/login', login)
app.post('/user/image', FBAuth, uploadUserImage)
app.post('/user/details', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)




// exports.getListings = functions.https.onRequest((req, res) => {

// })


exports.api = functions.https.onRequest(app);
