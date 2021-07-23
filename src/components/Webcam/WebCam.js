import React from 'react';
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import VideoPlayer from './VideoPlayer';
import Options from './Options';
import Notifications from './Notifications';

const useStyles = makeStyles((theme) => ({
    appBar: {
      borderRadius: 25, //15
      margin: '30px 100px', //30, 100
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '350px', //600
      border: '2px solid black',
  
      [theme.breakpoints.down('xs')]: {
        width: '90%',
      },
    },
    image: {
      marginLeft: '15px',
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
  }));

const WebCam = () => {
    const classes = useStyles();

    return (
        <div className = {classes.wrapper}>
          <AppBar className = {classes.appBar} position = "static" color="inherit">
            <Typography variant="h4" align="center" color = "Primary"> Meeting Assistant</Typography>
          </AppBar>
          <VideoPlayer />

          <Options>
              <Notifications />
          </Options>
        </div>
      );
    }

export default WebCam; 