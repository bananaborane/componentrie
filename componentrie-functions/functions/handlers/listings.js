const { admin, db } = require('../util/admin')

const config = require('../util/config')

exports.getAllListings = (req, res) => {
    db.collection('listings').orderBy('createdAt', 'desc').get()
        .then(data => {
            let listings = [];
            data.forEach(doc => {
                listings.push({
                    listingId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    userImage: doc.data().userImage
                });
            })
            return res.json(listings);
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({ error: err.code, message: 'Something went wrong while getting all listings' }))
        })
}

exports.postOneListing = (req, res) => {
    const newListing = {
        body: req.body.body,
        userHandle: req.user.handle,
        userImage: req.user.imageUrl,
        createdAt: new Date().toISOString(),
        watchCount: 0,
        inquiryCount: 0,
    };
    db.collection('listings').add(newListing)
        .then(doc =>{
            const resListing = newListing;
            resListing.listingId = doc.id;
            // res.json({ message: `document ${doc.id} created successfully` })
            res.json(resListing)
        })
        .catch(err => {
            res.status(500).json({ error: 'Something went wrong while creating an listing' })
            console.error(err);
        })
}

exports.postListingImage = (req, res) => {
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
        imageFileName = `${req.params.listingId}.${imageExtension}`
        const filepath = path.join(os.tmpdir(), imageFileName);
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
            return db.doc(`/listings/${req.params.listingId}`).update({ listingImages: [ imageUrl, ...listingImages ] })
        })
        .then(() => {
            return res.json({ message: 'Listing image uploaded successfully' })
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code, message: 'Something wrong happened while uploading listing image' })
        })
    })
    busboy.end(req.rawBody)
}

exports.getListing = (req, res) => {
    let listingData = {};
    db.doc(`/listings/${req.params.listingId}`).get()
        .then(doc => {
            if(!doc.exists){
                return res.status(404).json({ error: 'Listing not found' })
            }
            listingData = doc.data();
            listingData.listingId = doc.id;
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.code, message: 'Something went wrong while getting a listing' })
        })
}





exports.getMessagesForListing = (req, res) => {

}



exports.messageOnListing = (req, res) => {
    if(req.body.body.trim() === '') return res.status(400).json({ comment: 'Must not be empty' })
    
    // db.collection('inquiries').where('userId', '==', 'req.user.userId').where('listingId', '==', 'req.body.listingId').get()
    //     .then()
    //     .catch()
    
    const newInquiry = {
        body: req.body.body,
        createdAt: new Date().toISOString(),
        listingId: req.params.listingId,
        userHandle: req.user.handle,
        userImage: req.user.imageUrl
    };

    db.doc(`/listing${req.params.listingId}`).get()
        .then(doc => {
            if(!doc.exists){
                return res.status(404).json({ error: 'Listing not found' })
            }
            return db.collection
        })
}


// Watch a listing
exports.watchListing = (req, res) => {
    const watchDocument = db.collection('watches').where('userHandle', '==', req.user.handle).where('listingId', '==', req.params.listingId).limit(1);

    const listingDocument = db.doc(`/listings/${req.params.listingId}`);

    let listingData = {}

    listingDocument.get()
        .then(doc => {
            if(doc.exists){
                listingData = doc.data();
                listingData.listingId = doc.id;
                return likeDocument.get();
            } else {
                return res.status(404).json({ error: 'Listing not found' })
            }
        })
        .then(data => {
            if(data.empty){
                return db.collection('watches').add({
                    listingId: req.params.listingId,
                    userHandle: req.user.handle
                })
                .then(() => {
                    listingData.watchCount++;
                    return listingDocument.update({ watchCount: listingData.watchCount })
                })
                .then(() => {
                    return res.json(listingData)
                })
            } else {
                return res.status(400).json({ error: 'Listing already watching' })
            }
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({ error: err.code, message: 'Something went wrong while watching a listing' })
        })
}

exports.unwatchListing = (req, res) => {
    const watchDocument = db.collection('watches').where('userHandle', '==', req.user.handle).where('listingId', '==', req.params.listingId).limit(1);

    const listingDocument = db.doc(`/listings/${req.params.listingId}`);

    let listingData = {}

    listingDocument.get()
        .then(doc => {
            if(doc.exists){
                listingData = doc.data();
                listingData.listingId = doc.id;
                return likeDocument.get();
            } else {
                return res.status(404).json({ error: 'Listing not found' })
            }
        })
        .then(data => {
            if(data.empty){
                return res.status(400).json({ error: 'Listing not watching' })

            } else {
                return db.doc(`/watches/${data.doc[0].id}`).delete()
                    .then(() => {
                        listingData.watchCount--;
                        return listingDocument.update({ watchCount: listingData.watchCount })
                    })
                    .then(() => {
                        res.json(listingData)
                    })
                    
            }
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({ error: err.code, message: 'Something went wrong while watching a listing' })
        })
}



// Delete a listing
exports.deleteListing = (req, res) => {
    const listingDocument = db.doc(`/listings/${req.params.listingId}`);
    listingDocument.get()
        .then(doc => {
            if(!doc.exists) return res.status(404).json({ error: 'Listing not found' })
            if(doc.data().userHandle !== req.user.handle){
                return res.status(403).json({ error: 'Not authorized to delete listing' })
            }
            else {
                return listingDocument.delete();
            }
        })
        .then(() => {
            res.json({ message:'Listing deleted successfully' })
        })
        .catch(err => {
            console.error(err)
            return res.status(500).json({ error: err.code, message: 'Something went wrong while deleting a listing' })
        })
}


