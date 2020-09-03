import React from 'react'


// MUI Imports
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const styles = {
    card: {
        display: 'flex'
    }
}

function Listing(props) {
    const { classes, listing } = this.props;
    return (
        <Card>
            <CardMedia image={listing..userImage} title='Profile image' />
            <CardContent>
                <Typography variant="h5">{listing.userHandle}</Typography>
                <Typography variant="body2" color='textSecondary'>{listing.createdAt}</Typography>
                <Typography variant="body1">{listing.body}</Typography>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(Listing)
