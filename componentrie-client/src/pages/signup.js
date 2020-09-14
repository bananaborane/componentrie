import React, { useState } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import axios from 'axios'
import { Link } from 'react-router-dom'

// MUI imports
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'


const styles = theme => ({
    ...theme
})


function signup(props) {
    
    const { classes } = props
    const [signupProperties, setSignupProperties] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        handle: '',
        loading: false,
        errors: {},
    })
    const { errors, loading } = signupProperties

    const handleChange = event => {
        setSignupProperties({ ...signupProperties, [event.target.name]: event.target.value })
    }




    const handleSubmit = function(event){
        event.preventDefault();
        setSignupProperties({ ...signupProperties, loading: true });
        const { username, password, confirmPassword } = signupProperties
        const newUserData = { 
            username: username, 
            password: password,
            confirmPassword: confirmPassword 
        }
        axios.post('/signup', newUserData)
            .then(res => {
                console.log(res.data)
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
                setSignupProperties({ ...signupProperties, loading: false })
                props.history.push('/')
            })
            .catch(err => {
                setSignupProperties({ ...signupProperties, errors: err.response.data, loading: false })
            })
        
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

export default withStyles(styles)(signup);
