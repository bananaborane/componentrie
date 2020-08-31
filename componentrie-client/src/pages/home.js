import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'

export default function home() {
    useEffect(() => {

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
