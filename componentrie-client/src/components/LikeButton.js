import React from 'react'
import MyButton from '../util/MyButton'
import { Link } from 'react-router-dom'

// Icon Imports
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
 

// Redux Imports
import { connect } from 'react-redux'
import { watchListing, unwatchListing } from '../redux/actions/dataActions'



function LikeButton() {

    const likeButton = !authenticated ? (<MyButton tip="Like">
        <Link to="/login">
            <FavoriteBorder color='primary' />
        </Link>
    </MyButton>) : (<MyButton>
        
    </MyButton>)

    return (
        likeButton
    )
}

const mapStateToProps = state => ({
    
})

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
