import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Notifications from '../components/WebCam/Notifications';
import Options from '../components/WebCam/Options';
import VideoPlayer from '../components/WebCam/VideoPlayer';
import Header from '../components/UI/Header';

interface Props {}

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

export default function WebCam(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Header label={''} />
      {/* <Header label={'room'} /> */}
      {/* <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h4" align="center" color="primary">
          {' '}
          Meeting Assistant
        </Typography>
      </AppBar> */}

      <VideoPlayer />

      <Options>
        <Notifications />
      </Options>
    </div>
  );
}
