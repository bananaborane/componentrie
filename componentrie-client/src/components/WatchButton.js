import React from 'react'
import MyButton from '../util/MyButton'
import { Link } from 'react-router-dom'

// Icon Imports
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
 

// Redux Imports
import { connect } from 'react-redux'
import { watchListing, unwatchListing } from '../redux/actions/dataActions'



function WatchButton(props) {

    const watchedListing = () => {
        if (props.user.watches && props.user.watches.find(watch => watch.listingId === props.listingId)) return true
        else return false;
    }

    const watchListing = () => {
        props.watchListing(props.listingId)

    }


    const unwatchListing = () => {
        props.unwatchListing(props.listingId)

    }

    const { authenticated } = props.user;

    const watchButton = !authenticated ? (<Link to="/login">
        <MyButton tip="Watch">
            <FavoriteBorder color='primary' />
        </MyButton>
    </Link>) : watchListing() ? (
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
