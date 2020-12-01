import React from 'react'
import MyButton from '../util/MyButton'
import { Link } from 'react-router-dom'

// Icon Imports
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
 

// Redux Imports
import { connect } from 'react-redux'
import { watchListing, unwatchListing } from '../redux/actions/dataActions'



function WatchButton() {

    const watchButton = !authenticated ? (<MyButton tip="Watch">
        <Link to="/login">
            <FavoriteBorder color='primary' />
        </Link>
    </MyButton>) : watchListing() ? (
        <MyButton tip="Undo watch" onClick={props.unwatchListing}>
            <FavoriteIcon color='primary' />
        </MyButton>
    ) : (
        <MyButton tip="Watch" onClick={props.watchListing}>
            <FavoriteIcon color='primary' />
        </MyButton>
    )

    return (
        watchButton
    )
}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = {
    likeListing,
    unlikeLIsting
}

export default connect(mapStateToProps, mapActionsToProps)(WatchButton)
