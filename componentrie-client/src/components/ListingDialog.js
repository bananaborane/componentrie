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

const styles = theme => ({
    ...theme,
    invisibleSeparator: {
        border: 'none',
        margin: 4
    }
})

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

    const dialogMarkup = loading ? (<CircularProgress size={200}></CircularProgress>) : (<Grid container spacing={16}>
        <Grid item sm={5}>
            <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
            <Typography component={Link} color='primary' variant='h5' to={`/users/${userHandle}`}>
                @{userHandle}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography variant='body2' color='textSecondary'>
                {dayjs(createdAt).format('h:mm a, MMM DD YYYY')}
            </Typography>
            <hr className={classes.invisibleSeparator} />
        </Grid>
    </Grid>)

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

