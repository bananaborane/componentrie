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

// Redux imports
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions'


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
    const { email, password, confirmPassword, handle, errors, loading } = signupProperties

    const handleChange = event => {
        setSignupProperties({ ...signupProperties, [event.target.name]: event.target.value })
    }




    const handleSubmit = function(event){
        event.preventDefault();
        setSignupProperties({ ...signupProperties, loading: true });
        const { username, password, confirmPassword, handle } = signupProperties
        const newUserData = { 
            username: username, 
            password: password,
            confirmPassword: confirmPassword,
            handle: handle
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
                    Signup
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField id='email' name='email' type='email' label='Email' className={classes.textField} helperText={errors.email} error={errors.email ? true : false} value={email} onChange={handleChange} fullWidth />

                    <TextField id='password' name='password' type='password' label='Password' className={classes.textField} helperText={errors.password} error={errors.password ? true : false} value={password} onChange={handleChange} fullWidth />

                    <TextField id='confirmPassword' name='confirmPassword' type='password' label='Confirm Password' className={classes.textField} helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false} value={confirmPassword} onChange={handleChange} fullWidth />

                    <TextField id='handle' name='handle' type='text' label='Handle' className={classes.textField} helperText={errors.handle} error={errors.handle ? true : false} value={handle} onChange={handleChange} fullWidth />

                    { errors.general && (
                        <Typography variant='body2' className={classes.customError}>
                            {errors.general}
                        </Typography>
                    ) }
                    <Button type='submit' variant='contained' color='primary' className={classes.button} disabled={loading}>
                        Signup
                        {loading && (
                            <CircularProgress size={30} className={classes.progress} />
                        )}
                    </Button>
                    <br />
                    <small>
                        Already have an account? Login 
                        <Link to='/login'>
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

export default connect(mapStateToProps, { logoutUser })(withStyles(styles)(signup));
