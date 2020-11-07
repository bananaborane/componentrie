import React, { useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../util/MyButton'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

// MUI Imports
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Icon Imports
import CloseIcon from '@material-ui/icons/Close';

// Redux Imports
import { connect } from 'react-redux'
import { getListing } from '../redux/actions/dataActions'

const styles = {


}

function ListingDialog() {
    return (
        <div>
            
        </div>
    )
}

export default ListingDialog

