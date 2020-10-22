import React, { useState, useEffect } from 'react'

import MyButton from '../util/MyButton'

// MUI Imports
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'

// MUI Icon Imports
import ChatIcon from '@material-ui/icons/Chat'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

// Redux Imports
import { connect } from 'react-redux';
import { deleteListing } from '../redux/actions/dataActions'

const styles = {
    
}

function DeleteListing() {
    const { classes } = props;

    const [deleteListingState, setDeleteListingState] = useState({
        open: false
    })

    const handleOpen = () => {
        setDeleteListing({
            ...deleteLIstingState,
            open: true
        })
    }

    return (
        <>
            <MyButton tip='Delete Listing' onClick={handleOpen} btnClassName={classes.delete} />
            <DeleteOutline color='secondary' />
        </>
    )
}



export default connect(mapStateToProps, { deleteListing })(withStyles(styles)(DeleteListing));
