import React, { useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

// MUI imports
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'


// Redux imports
import { connect } from 'react-redux'
import { editUserDetails } from '../redux/actions/userActions'

const styles = theme => ({
    ...theme,
    button: {
        float: 'right'
    }
})

function EditDetails(props) {
    const [userDetailsState, setUserDetailsState] = useState({
        bio: '',
        website: '',
        location: '',
        open: false
    })  

    useEffect(() => {
        const { credentials } = props;
        mapUserDetailsToState(credentials)
    }, [])
    
    
    
    const handleOpen = () => {
        setUserDetailsState({
            ...userDetailsState,
            open: true
        })
        mapUserDetailsToState(props.credentials)
        
    }
    
    const handleClose = () => {
        setUserDetailsState({
            ...userDetailsState,
            open: false
        })
    }

    const handleChange = event => {
        setLoginProperties({ ...loginProperties, [event.target.name]: event.target.value })
    }

    const handleSubmit = () => {
        const userDetails = {
            bio: userDetailsState.bio,
            website: userDetailsState.website,
            location: userDetailsState.location,
        }
        props.editUserDetails(userDetails)
        handleClose();
    }
    
    const mapUserDetailsToState = credentials => {
        setUserDetailsState({
            ...userDetailsState,
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',
        })
    }

    const { classes } = props;

    return (
        <>
            <Tooltip title='Edit details' placement='top'>
                <IconButton onClick={handleOpen} className={classes.button} >
                    <EditIcon color='primary' />
                </IconButton>
                <Dialog open={userDetailsState.open} onClose={handleClose} fullWidth maxWidth='sm'>
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField name='bio' type='text' label='Bio' multiline rows='3' placeholder='A short bio about yourself' className={classes.textField} value={userDetailsState.bio} onChange={handleChange} fullWidth />
                            <TextField name='website' type='text' label='Website' multiline rows='3' placeholder='Your personal/professional website' className={classes.textField} value={userDetailsState.website} onChange={handleChange} fullWidth />
                            <TextField name='location' type='text' label='Location' multiline rows='3' placeholder='Where you are located' className={classes.textField} value={userDetailsState.location} onChange={handleChange} fullWidth />
                        </form>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} color='primary' >
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color='primary' >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </Tooltip>
        </>
    )
}

const mapStateToProps = state => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails))
