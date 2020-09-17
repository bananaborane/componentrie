import React, { useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import axios from 'axios'
import { Link } from 'react-router-dom'

// MUI imports
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

// Redux Imports
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'


const styles = theme => ({
    ...theme
})


function login(props) {
    
    // Line below takes loading out from props.UI object
    const { classes, UI: { loading } } = props

    
    const [loginProperties, setLoginProperties] = useState({
        email: '',
        password: '',
        handle: '',
        errors: {},
    })
    const { email, password, handle, errors } = loginProperties


    useEffect(() => {
        console.log(`props.UI.errors has changed`)
    }, [props.UI.errors]);

    const handleChange = event => {
        setLoginProperties({ ...loginProperties, [event.target.name]: event.target.value })
    }




    const handleSubmit = function(event){
        event.preventDefault();
        const { username, password } = loginProperties
        const userData = { 
            username: username, 
            password: password 
        }

        props.loginUser(userData, props.history)
    }

    return (
        <Grid container className={classes.form}>
            
            <Grid item sm/>
                <p>hi mom</p>
                <Typography variant='h3' className={classes.pageTitle}>
                    Login
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField id='email' name='email' type='email' label='Email' className={classes.textField} helperText={errors.email} error={errors.email ? true : false} value={email} onChange={handleChange} fullWidth />
                    <TextField id='password' name='password' type='password' label='Password' className={classes.textField} helperText={errors.password} error={errors.password ? true : false} value={password} onChange={handleChange} fullWidth />
                    { errors.general && (
                        <Typography variant='body2' className={classes.customError}>
                            {errors.general}
                        </Typography>
                    ) }
                    <Button type='submit' variant='contained' color='primary' className={classes.button} disabled={loading}>
                        Login
                        {loading && (
                            <CircularProgress size={30} className={classes.progress} />
                        )}
                    </Button>
                    <br />
                    <small>
                        Don't have an account? Sign up 
                        <Link to='/signup'>
                            Here
                        </Link>
                    </small>
                </form>
            </Grid>
            
        </Grid>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
