import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import EditDetails from './EditDetails'
import MyButton from '../util/MyButton'


// Material UI imports
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'


// Redux imports
import { connect } from 'react-redux'
import { logoutUser, uploadUserImage } from './../redux/actions/userActions'

const styles = theme => ({
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
  })


function Profile(props) {
    const { classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, loading, authenticated } } = props;

  const handleImageChange = event => {
    const image = event.target.files[0];
    // send to server
    const formData = new FormData();
    formData.append('image', image, image.name);
    props.uploadUserImage(formData)
    
  }

  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')
    // vanillajs to propagate another click event
    fileInput.click();
  }

  const handleLogout = () => {
    props.logoutUser
  }

    let profileMarkUp = !loading ? (authenticated ? (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className='profile-image' />
                    <input type="file" id='imageInput' hidden='hidden' onChange={handleImageChange} />
                  
                    <MyButton tip='Edit profile picture' onClick={handleEditPicture} btnClassName='button'>
                      <EditIcon color='primary' />
                    </MyButton>
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
                    <CalendarToday color='primary' />{'  '}
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>

              <MyButton tip='Logout' onClick={handleLogout}>
                      <KeyboardReturn color='primary' />
              </MyButton>

              <EditDetails />
            </div>
        </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant='body2' align='center'>
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button variant='contained' color='primary' component={Link} to='/login'>login</Button>
          <Button variant='contained' color='secondary' component={Link} to='/signup'>signup</Button>
        </div>
      </Paper>
    )) : (<p>Loading...</p>)
    return (
        profileMarkUp
    )
}

const mapStateToProps = state => {
    user: state.user
}

const mapActionsToProps = { logoutUser, uploadUserImage }

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
