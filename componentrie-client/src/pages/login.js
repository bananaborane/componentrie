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


const styles = {
    form: {
        textAlign: 'center'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    }
}


function login(props) {
    
    const { classes } = props
    const [loginProperties, setLoginProperties] = useState({
        email: '',
        password: '',
        loading: false,
        errors: {},
    })
    const { errors, loading } = loginProperties

    const handleChange = event => {
        setLoginProperties({ ...loginProperties, [event.target.name]: event.target.value })
    }




    const handleSubmit = function(event){
        event.preventDefault();
        setLoginProperties({ ...loginProperties, loading: true });
        const { username, password, loading } = loginProperties
        const userData = { username: username, password: password }
        axios.post('/login', userData)
            .then(res => {
                console.log(res.data)
                setLoginProperties({ ...loginProperties, loading: false })
                props.history.push('/')
            })
            .catch(err => {
                setLoginProperties({ ...loginProperties, errors: err.response.data, loading: false })
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

export default withStyles(styles)(login);
