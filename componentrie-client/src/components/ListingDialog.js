import React, { useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../util/MyButton'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

// MUI Imports
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Icon Imports
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';

// Redux Imports
import { connect } from 'react-redux'
import { getListing } from '../redux/actions/dataActions'

const styles = {


}

function ListingDialog(props) {

    const [listingDialogState, setListingDialogState] = useState({
        open: false
    })

    const handleOpen = () => {
        setListingDialogState({
            ...listingDialogState,
            open: true
        })
        props.getListing(props.listingId)
    }
    
    const handleClose = () => {
        setListingDialogState({
            ...listingDialogState,
            open: false
        })
    }

    const { classes, listing:  { listingId, body, createdAt, watchCount, inquiryCount, userImage, userHandle }, UI: { loading } } = props;

    const dialogMarkup = loading ? (<CircularProgress></CircularProgress>) : (<CircularProgress></CircularProgress>)

    return (
        <>
            <MyButton onClick={handleOpen} tip='Expand listing' tipClassName={classes.expandButton}>
               <UnfoldMore color='primary' />
               <Dialog open={postListingState.open} onClose={handleClose} fullWidth maxWidth='sm' >
                <MyButton tip='Close' onClick={handleClose} tipClassName={classes.closeButton}>
                    <CloseIcon />
                </MyButton>
                <DialogContent className={classes.DialogContent}>
                    { dialogMarkup }
                </DialogContent>
               </Dialog>
            </MyButton>
        </>
    )
}


const mapStateToProps = state => ({
    listing: state.data.listing,
    UI: listing.UI
})

const mapActionsToProps = {
    getListing
}



export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ListingDialog))

