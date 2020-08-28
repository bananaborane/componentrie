const { admin, db } = require('../util/admin')

const config = require('../util/config')

const firebase = require('firebase')
firebase.initializeApp(config)

const { validateSignupData, validateLoginData, reduceUserDetails } = require('../utli/validators') 

exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };

    const { valid, errors } = validateSignupData(newUser)

    if(!valid) return res.status(400).json(errors);

    const noImg = 'no-img.png'


    let token, userId;
    db.doc(`/users/${newUser.handle}`).get()
        .then(doc => {
            if (doc.exists){
                return res.status(400).json({ handle: 'This handle is already taken' })
            } else {
                return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
            }
        })
        .then(data => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then(idToken => {
            token = idToken;
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
                userId: userId
            }
            return db.doc(`/users/${newUser.handle}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({ token: token })
        })
        .catch(err => {
            console.error(err);
            if(err.code === 'auth/email-already-in-use'){
                return res.status(400).json({ email: 'Email is already in use' })
            } else {
                return res.status(500).json({ error: err.code, message: 'Something happened while creating new user' })
            }
        })


}

exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const { valid, errors } = validateLoginpData(user)

    if(!valid) return res.status(400).json(errors);



    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token => {
            return res.json({ token: token })
        })
        .catch(err => {
            console.error(err)
            if (err.code === 'auth/wrong-password'){
                return res.status(403).json({ message: 'Wrong credentials, please try again' })
            } else {
                return res.status(500).json({ error: err.code, message: 'Something went wrong while logging in' })
            }
        })
}

// Add user details
exports.addUserDetails = (req, res) => {
    let userDetails = reduceUserDetails(req.body)

    db.doc(`/users/${req.user.handle}`).update(userDetails)
        .then(() => {
            return res.json({ message: 'Details added/updated successfully' })
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code, message: 'Something wrong happened while updating user details' })
        })
}

// Get any user's details
exports.getUserDetails = (req, res) => {
    let userDetails = {}
    db.doc(`/users/${req.params.handle}`).get()
        .then(doc => {
            if(doc.exists){
                userData.user = doc.data()
                return db.collection('listings').where('userHandle', '==', req.params.handle).orderBy('createdAt', 'desc').get()
            } else {
                return res.status(404).json({ error: 'User not found' })
            }
        })
        .then(data => {
            userData.listings = [];
            data.forEach(doc => {
                userData.listings.push({
                    title: doc.data().title,
                    userHandle: doc.data().userHandle,
                    userImage: doc.data().userImage,
                    watchCount: doc.data().watchCount,
                    listingId: doc.id
                })
            })
            return res.json(userData)
        })
        catch(err => {
            console.error(err)
            return res.status(500).json({ error: err.code, message: "Something went wrong while getting any user's details" })
        })
}


// Get own user details
exports.getAuthenticatedUser = (req, res) => {
    let userData = {};
    db.doc(`/users/${req.user.handle}`).get()
        .then(doc => {
            if(doc.exists){
                userData.credentials = doc.data();
                return db.collection('favorites').where('userHandle', '==', 'req.user.handle').get();
            }
        })
        .then(data => {
            userData.favorites = [];
            data.forEach(doc => {
                userData.favorites.push(doc.data())
            });
            return db.collection('notifications').where('recipient', '==', req.user.handle).orderBy('createdAt', 'desc').limit(10).get()
        })
        .then(data => {
            userData.notifications = []
            data.forEach(doc => {
                userData.notifications.push({
                    recipient: doc.data().recipient,
                    sender: doc.data().sender,
                    createdAt: doc.data().createdAt,
                    listingId: doc.data().listingId,
                    type: doc.data().type,
                    read: doc.data().read,
                    notificationId: doc.id
                })
            })
            return res.json(userData)
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code, message: 'Something went wrong while getting own user details' })
        })
}



// Upload an user image profile
exports.uploadUserImage = (req, res) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = new BusBoy({ headers: req.headers });

    let imageFileName;
    let imageToBeUploaded = {}

    busboy.on('file', (fieldName, file, filename, encoding, mimetype) => {
        console.log(fieldname, filename, mimetype)
        if(mimetype !== 'image/jpeg' && mimetype !== 'image/png'){
            return res.status(400).json({ message: 'Wrong file type submitted' })
        }

        // image.png
        const imageExtension = filename.split('.')[filename.split('.').length - 1]
        imageFileName = `${Math.round(Math.random() * 1000000)}.${imageExtension}`
        const filepath = path.json(os.tmpdir(), imageFileName);
        imageToBeUploaded = { filepath: filepath, mimetype: mimetype }
        file.pipe(fs.createWriteStream(filepath))
    });
    busboy.on('finish', () => {
        admin.storage().bucket(config.storageBucket).upload(imageToBeUploaded.filepath, {
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageToBeUploaded.mimetype
                }
            }
        })
        .then(() => {
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`
            return db.doc(`/users/${req.user.handle}`).update({ imageUrl: imageUrl })
        })
        .then(() => {
            return res.json({ message: 'Image uploaded successfully' })
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code, message: 'Something wrong happened while uploading user image' })
        })
    })
    busboy.end(req.rawBody)
}




exports.markNotificationsRead = (req, res) => {
    let batch = db.batch()
    req.body.forEach(notificationId => {
        const notification = db.doc(`/notifications/${notificationId}`)
        batch.update(notification, { read: true })
    })
    batch.commit()
        .then(() => {
            return res.json({ message: 'Notifications marked read' })
        })
        .catch(err => {
            console.error(err)
            return res.status(500).json({ error: err.code, message: 'Something went wrong while marking notifications read' })
        })
}


