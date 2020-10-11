import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Listing from '../components/Listing'
import Profile from '../components/Profile'

import { connect } from 'react-redux';
import { getListings } from '../redux/actions/dataActions'

function home(props) {

    const { listings, loading } = props.data;

    useEffect(() => {
        props.getListings()
    }, [])

    const recentListingsMarkup = loading ? (listings.map(listing => {
        return (<Listing key={listing.listingId} listing={listing} />)
        })) : (<p>Loading...</p>)


    return (
        <Grid container spacing={16}>
            <Grid item sm={8} xs={12}>
                {recentListingsMarkup}
            </Grid>
            <Grid item sm={8} xs={12}>
                <Profile />
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => ({
    data: state.data
})


export default connect(mapStateToProps, { getListings })(home);
