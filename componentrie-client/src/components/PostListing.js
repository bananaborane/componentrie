import React, { useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

// MUI imports
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
import CircularProgress from '@material-ui/core/CircularProgress'
import AddIcon from '@material-ui/icons/Add';

// Redux imports
import { connect } from 'react-redux'
import { postListing } from '../redux/actions/userActions'

const styles = {

}

function PostListing() {

    const [postListingState, setPostListingState] = useState({
        open: false,
        body: '',
        errors: {}
    })

    const handleOpen = () => {
        setPostListingState({ ...postListingState, open: true })
    }

    const handleClose = () => {
        setPostListingState({ ...postListingState, open: false })
    }

    return (

        const { errors } = postListingState;
        const { classes: UI: { loading } } = propsp;

        <>
            <MyButton onClick={handleOpen} tip='Post a Listing'>
                    <AddIcon />
            </MyButton>  
            <Dialog open={postListingState.open} onClose={handleClose} fullWidth maxWidth='sm' >
                
            </Dialog> 
        </>
    )
}

const mapStateToProps = state => {
    UI: state.UI
}


export default connect((mapStateToProps, { postListing }))(withStyles(styles)(PostListing))
