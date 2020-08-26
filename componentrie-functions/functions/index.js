const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello friend.");
});

exports.createItem = functions.https.onRequest((req, res) => {
    if (req.method !== 'POST'){
        return res.status(400).json({ error: 'Method not allowed for creating item' });
    }
    const newItem = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())
    };
    admin.firestore().collection('items').add(newItem)
        .then(doc =>{
            res.json({ message: `document ${doc.id} created successfully` })
        })
        .catch(err => {
            res.status(500).json({ error: 'Something went wrong while creating an item' })
            console.error(err);
        })
})
