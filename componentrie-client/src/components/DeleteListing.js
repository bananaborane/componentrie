import React from 'react'

import MyButton from '../util/MyButton'

// MUI Imports
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

// MUI Icon Imports
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

// Redux Imports
import { connect } from 'react-redux';
import { watchListing, unwatchListing } from '../redux/actions/dataActions'

function DeleteListing() {
    return (
        <div>
            
        </div>
    )
}

export default DeleteListing
