import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Listing from '../components/Listing'

export default function home() {
    const [listings, setListings] = useState([])
    useEffect(() => {
        axios.get('/listings')
            .then(res => {
                console.log(res.data)
                setListings(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const recentListingsMarkup = listings.length ? (listings.map(listing => {
    return (<Listing key={listing.listingId} listing={listing} />)
    })) : (<p>Loading...</p>)


    return (
        <Grid container spacing={16}>
            <Grid item sm={8} xs={12}>
                {recentListingsMarkup}
            </Grid>
            <Grid item sm={8} xs={12}>
                <p>Profile here</p>
            </Grid>
        </Grid>
    )
}
