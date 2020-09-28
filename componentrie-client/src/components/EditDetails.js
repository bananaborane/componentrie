import React, { useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'


// Redux imports
import { connect } from 'react-redux'
import { editUserDetials } from '../redux/actions/userActions'

const styles = theme => ({
    ...theme
})

function EditDetails(props) {
    const [userDetailsState, setUserDetailsState] = useState({
        bio: '',
        website: '',
        location: '',
        open: false
    })  

    useEffect(() => {
        const { credentials } = props;
        setUserDetailsState({
            ...userDetasState,
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',
        })
    }, [])


    return (
        <>
            
        </>
    )
}

const mapStateToProps = state => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, { editUserDetials })(withStyles(styles)(EditDetails))
