import React, { useState } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

// MUI imports
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


const styles = {
    form: {
        textAlign: 'center'
    } 
}


function login(props) {
    
    const { classes } = props
        const [loginProperties, setLoginProperties] = useState({
            email: '',
            password: '',
            loading: false,
            errrors: {},
        })

    const handleChange = event => {
        setLoginProperties({ ...loginProperties, [event.target.name]: event.target.value })
    }




    const handleSubmit = function(event){
        console.log('from handleSubmit')
    }

    return (
        <Grid container className={classes.form}>
            
            <Grid item sm/>
                <p>hi mom</p>
                <Typography variant='h3' className={classes.pageTitle}>
                    Login
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField id='email' name='email' type='email' label='Email' className={classes.textField} value={email} onChange={handleChange} fullWidth />
                    <TextField id='password' name='password' type='password' label='Password' className={classes.textField} value={password} onChange={handleChange} fullWidth />
                    <Button type='submit' variant='contained' color='primary' className={classes.button} />
                </form>
            </Grid>
            
        </Grid>
    )
}

export default withStyles(styles)(login);
