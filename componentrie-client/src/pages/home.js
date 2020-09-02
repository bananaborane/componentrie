import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'

export default function home() {
    const [listings, setListings] = useState([])
    useEffect(() => {
        axios.get('/listings')
            .then(res => {
                setListings(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <Grid container spacing={16}>
            <Grid item sm={8} xs={12}>
                <p>Content here</p>
            </Grid>
            <Grid item sm={8} xs={12}>
                <p>Profile here</p>
            </Grid>
        </Grid>
    )
}
