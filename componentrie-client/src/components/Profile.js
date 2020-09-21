import React from 'react'
import { connect } from 'react-redux'

// Material UI imports
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'


function Profile() {
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
