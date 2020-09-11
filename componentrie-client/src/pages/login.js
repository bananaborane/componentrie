import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

// MUI imports
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'


const styles = {
    form: {
        textAlign: 'center'
    } 
}

function login(props) {

    const { classes } = props

    const handleSubmit = function(event){
        console.log('from handleSubmit')
    }

    return (
        <Grid container className={classes.form}>
            <Grid item sm/>
            <Grid item sm/>
                <p>hi mom</p>
                <Typography variant='h3' className={classes.pageTitle}>
                    Login
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                <TextField id='email' name='email' type='email' label='Email' className={classes.textField}>
                    
                </TextField>
                </form>
            </Grid>
            <Grid item sm/>
        </Grid>
    )
}

export default withStyles(styles)(login);
