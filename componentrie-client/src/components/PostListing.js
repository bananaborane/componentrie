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
import CloseIcon from '@material-ui/icons/Close';

// Redux imports
import { connect } from 'react-redux'
import { postListing } from '../redux/actions/userActions'

const styles = theme => ({
    ...theme,
    submitButton: {
        position: 'relative'
    },
    progessSpinner: {
        position: 'absolute'
    }
})

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
    const handleSubmit = () => {
        
    }

    return (

        const { errors } = postListingState;
        const { classes: UI: { loading } } = propsp;

        <>
            <MyButton onClick={handleOpen} tip='Post a Listing'>
                    <AddIcon />
            </MyButton>  
            <Dialog open={postListingState.open} onClose={handleClose} fullWidth maxWidth='sm' >
                <MyButton tip='Close' onClick={handleClose} tipClassName={classes.closeButton}>
                    <CloseIcon />
                </MyButton>
                <DialogTitle>
                    Post a new Listing
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField name='body' type='text' label='Listing' multiline rows='3' placeholder='Post a listing for everyone to see' error={errors.body ? true : false} helperText={errors.body} className={classes.textField} onChange={handleChange} fullWidth />
                        <Button type='submit' variant='contained' color='primary' className={classes.submitButton} disabled={loading}>
                            Submit
                            {loading && (<CircularProgress size={30} className={classes.progressSpinner} />)}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog> 
        </>
    )
}

const mapStateToProps = state => {
    UI: state.UI
}


export default connect((mapStateToProps, { postListing }))(withStyles(styles)(PostListing))
