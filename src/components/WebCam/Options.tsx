import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Container, Paper } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext} from '../../providers/SocketProvider';

interface Props {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    // justify: 'flex-end',
    width: '200%', //100
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '300px', //600
    margin: '1px 1', //35
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%', //80
    },
  },
  margin: {
    marginTop: 10, //20
  },
  padding: {
    padding: 5, //20
  },
  paper: {
    padding: '5px 5px', //10, 20
    border: '2px solid black',
  },
}));

const Options = ({ children }: Props) => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>

        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>

            <Grid item xs={12} md={6} className={classes.padding}>
              {/* <Typography gutterBottom variant="h6">Account Info</Typography> */}
              <TextField
                label="Type User Name"
                value={name}
                onChange={(e) => setName!(e.target.value!)}
                fullWidth
              />
              {/* {console.log(me)} */}

              <CopyToClipboard text={me!}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Assignment fontSize="large" />}
                  className={classes.margin}
                >
                  Copy room id
                </Button>
              </CopyToClipboard>
            </Grid>

            <Grid item xs={12} md={6} className={classes.padding}>
              {/* <Typography gutterBottom variant="h6">Make a call</Typography> */}
              <TextField
                label="Room ID to call"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                fullWidth
              />

              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PhoneDisabled fontSize="large" />}
                  fullWidth
                  onClick={leaveCall}
                  className={classes.margin}
                >
                  Hang Up
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Phone fontSize="small" />}
                  fullWidth
                  onClick={() => callUser!(idToCall)}
                  className={classes.margin}
                >
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default Options;
