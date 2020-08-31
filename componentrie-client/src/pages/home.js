import React from 'react'
import Grid from '@material-ui/core/Grid'

export default function home() {
    return (
        <Grid container>
            <Grid item sm={8} xs={12}>
                <p>Content here</p>
            </Grid>
            <Grid item sm={8} xs={12}>
                <p>Profile here</p>
            </Grid>
        </Grid>
    )
}
