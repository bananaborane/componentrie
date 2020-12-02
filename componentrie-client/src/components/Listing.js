import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import MyButton from '../util/MyButton'
import DeleteListing from '../components/DeleteListing'
import ListingDialog from '../components/ListingDialog'

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
import WatchButton from './WatchButton'


const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

function Listing(props) {



    const { classes, 
        listing: { 
            body, 
            createdAt, 
            userImage, 
            userHandle, 
            listingId, 
            watchCount, 
            inquiryCount }, 
        user { 
            authenticated,
            credentials: {
                handle
            } 
        } 
    } = props;


    const watchButton = !authenticated (<MyButton tip='Watch'>
        <Link to='/login'>
            <FavoriteBorder color='primary' />
        </Link>
    </MyButton>) : (watchedListing() ? (<MyButton tip='Undo watch' onClick={unwatchListing}>
        <FavoriteIcon color='primary' />
    </MyButton>) : (<MyButton tip='Watch' onClick={watchListing}>
        <FavoriteBorder color='primary' />
    </MyButton>))

    const deleteButton = authenticated && userHandle === handle ? (
        <DeleteListing listingId={listingId} />
    ) : null


    dayjs.extend(relativeTime)
    return (
        <Card className={classes.card}>
            <CardMedia image={listing.userImage} title='Profile image' className={classes.image}/>
            <CardContent className={classes.content}>
                <Typography variant="h5" component={Link} to={`/users/${listing.userHandle}`} color='primary'>{listing.userHandle}</Typography>
                {deleteButton}
                <Typography variant="body2" color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1">{listing.body}</Typography>
                <WatchButton listingId={listingId} />
                <span>{watchCount} watchers</span>
                <MyButton tip='comments'>
                    <ChatIcon color='primary' />
                </MyButton>
                <span>{inquiryCount} inquiries</span>
                <ListingDialog listingId={listingId} userHandle={userHandle} />
            </CardContent>
        </Card>
    )
}


const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = {
    watchListing,
    unwatchListing
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Listing))
