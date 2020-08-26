const { db } = require('../util/admin')

exports.getAllListings = (req, res) => {
    db.collection('listings').orderBy('createdAt', 'desc').get()
        .then(data => {
            let listings = [];
            data.forEach(doc => {
                listings.push({
                    listingId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt
                });
            })
            return res.json(listings);
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({ error: err.code }))
        })
}

exports.postOneListing = (req, res) => {
    const newListing = {
        body: req.body.body,
        userHandle: req.user.handle,
        createdAt: new Date().toISOString()
    };
    db.collection('listings').add(newListing)
        .then(doc =>{
            res.json({ message: `document ${doc.id} created successfully` })
        })
        .catch(err => {
            res.status(500).json({ error: 'Something went wrong while creating an listing' })
            console.error(err);
        })
}