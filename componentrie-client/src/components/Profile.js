import React from 'react'
import { connect } from 'react-redux'

// Material UI imports
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'

const styles = {
    
}


function Profile(props) {
    const { classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, loading } } = props;
    return (
        <div>
            From Profile.js
        </div>
    )
}

const mapStateToProps = state => {
    user: state.user
}

export default connect(mapStateToProps)(withStyles(styles)(Profile))
