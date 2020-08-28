const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./util/fbAuth')
const { db } = require('./util/admin')

const { getAllListings, postOneListing, getListing, getMessagesForListing, messageOnListing, watchListing, unwatchListing, deleteListing } = require('./handlers/listings')
const { signup, login, uploadUserImage, addUserDetails, getAuthenticatedUser, getUserDetails, markNotificationsRead } = require('./handlers/users')




// Listing routes

app.get('/listings', getAllListings)
app.post('/listing', FBAuth, postOneListing)
app.get('/listing/:listingId', getListing);
app.get('/listing/messages', FBAuth, getMessagesForListing)
app.post('/listing/:listingId/inquire', FBAuth, messageOnListing)
app.get('/listing/:listingId/watch', FBAuth, watchListing)
app.get('/listing/:listingId/unwatch', FBAuth, unwatchListing)
app.delete('/listing/:listingId', FBAuth, deleteListing);

// TODO: delete a listing, watch a listing, unwatch a listing


// Users routes

app.post('/signup', signup)
app.post('/login', login)
app.post('/user/image', FBAuth, uploadUserImage)
app.post('/user/details', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)
app.get('/user/:handle', getUserDetails);
app.post('/notifications', FBAuth, markNotificationsRead)



// exports.getListings = functions.https.onRequest((req, res) => {

// })


exports.api = functions.https.onRequest(app);


exports.createNotificationOnWatch = functions.firestore.document('watches/{id}')
    .onCreate(snapshot => {
        return db.doc(`/listings${snapshot.data().listingId}`).get()
            .then(doc => {
                if(doc.exists && doc.data().userId !==  snapshot.data().userId) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                    createdAt: new Date().toISOString(),
                    recipient: doc.data().userHandle,
                    sender: snapshot.data().userHandle,
                    type: 'watch',
                    read: false,
                    listingId: doc.id
                    })
                }

            })
            .catch(err => {
                console.error(err)
            })
    })


exports.deleteNotificationOnUnwatch = functions.firestore.document('watches/{id}')
    .onDelete(snapshot => {
        return db.doc(`/notifications/${snapshot.id}`)
            .delete()
            .catch(err => {
                console.error(err)
                return;
            })
    })



exports.createNotificationOnMessage = functions.firestore.document('messages/{id}')
    .onCreate(snapshot => {
        return db.doc(`/listings${snapshot.data().listingId}`).get()
            .then(doc => {
                if(doc.exists && doc.data().userId !==  snapshot.data().userId) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                    createdAt: new Date().toISOString(),
                    recipient: doc.data().userHandle,
                    sender: snapshot.data().userHandle,
                    type: 'message',
                    read: false,
                    listingId: doc.id
                    })
                }

            })
            .catch(err => {
                console.error(err)
                return;
            })
    })
