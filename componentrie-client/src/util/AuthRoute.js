import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


function AuthRoute({ component: Component, authenticated, ...rest }) {
    return (
        <Route {...rest} render={props => authenticated === true ? <Redirect to='/' /> : <Component {...props} /> } />
    )
}

// function component above takes out component and authenticated variables but spreads out the rest of the variables in props

const mapStateToProps = state = ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(AuthRoute)
