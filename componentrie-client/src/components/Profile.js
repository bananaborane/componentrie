import React from 'react'
import { Link } from 'react-router-dom'

// Material UI imports
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'


// Redux imports
import { connect } from 'react-redux'

const styles = {
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: theme.palette.primary.main
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
  }


function Profile(props) {
    const { classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, loading } } = props;
    let profileMarkUp = !loading ? (authenticated ? (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="profile-image">
                    <img src={imageUrl} alt="profile"/>
                </div>
                <hr />
                <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${handle}`} color='primary' variant='h5'>
                        @{handle}
                    </MuiLink>
                    <hr />
                    {bio && (<Typography variant='body2'>{bio}</Typography>)}
                    {location && (<>
                        <LocationOn color='primary' />
                        <span>{location}</span>
                        <hr />
                    </>)}
                    {website && (<>
                        <LinkIcon color='primary' />
                        <a href={website} target='_blank' rel='noopener noreferrer'>
                            {'  '}{website}
                        </a>
                        <hr />
                    </>)}
                </div>
            </div>
        </Paper>
    ) : ()) : (<p>Loading...</p>)
    return (
        profileMarkUp
    )
}

const mapStateToProps = state => {
    user: state.user
}

export default connect(mapStateToProps)(withStyles(styles)(Profile))
