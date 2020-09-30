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
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'


// Redux imports
import { connect } from 'react-redux'
import { editUserDetails } from '../redux/actions/userActions'

const styles = theme => ({
    ...theme
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
            </Tooltip>
        </>
    )
}

const mapStateToProps = state => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails))
