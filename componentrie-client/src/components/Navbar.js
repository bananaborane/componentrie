import React from 'react'
import { Link } from 'react-router-dom'
import MyButton from '../util/MyButton'
import PostListing from './PostListing'

// Redux imports
import { connect } from 'react-redux'

// MUI imports

import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'


import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import Notifications from '@material-ui/icons/Notifications'

function Navbar(props) {

    const { authenticated } = props;
 
    return (
        <AppBar>
            <Toolbar className='nav-container'>
                {authenticated ? (
                    <>
                        <PostListing />
                        <Link to='/'>
                            <MyButton tip='Home'>
                                <HomeIcon/>
                            </MyButton>
                        </Link>
                        <MyButton tip='Notifications'>
                            <Notifications />
                        </MyButton>
                    </>
                ) : (
                    <>
                        <Button color='inherit' component={Link} to='/login'>Login</Button>
                        <Button color='inherit' component={Link} to='/'>Home</Button>
                        <Button color='inherit' component={Link} to='/signup'>Signup</Button>
                    </>
                )}

            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = state => {
    authenticated: state.user.authenticated
}

export default connect(mapStateToProps)(Navbar);

