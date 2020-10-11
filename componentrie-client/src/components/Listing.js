import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'


// MUI Imports
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

// Redux Imports
import { connect } from 'react-redux';
import { watchListing, unwatchListing } from'../redux/actions/dataActions

const styles = {
    card: {
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
    const { classes, listing } = props;
    dayjs.extend(relativeTime)
    return (
        <Card className={classes.card}>
            <CardMedia image={listing.userImage} title='Profile image' className={classes.image}/>
            <CardContent className={classes.content}>
                <Typography variant="h5" component={Link} to={`/users/${listing.userHandle}`} color='primary'>{listing.userHandle}</Typography>
                <Typography variant="body2" color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1">{listing.body}</Typography>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(Listing)
