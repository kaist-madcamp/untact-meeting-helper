import React, { useContext } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../../providers/SocketProvider';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '650px', //550
    [theme.breakpoints.down('xs')]: {
      width: '300px', //300
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '0px', //10
    border: '2px solid black', //2
    margin: '5px', //10
  },
}));

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
  } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        //   Our own video
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || 'Name'}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        // users video
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call?.name || 'Name'}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
