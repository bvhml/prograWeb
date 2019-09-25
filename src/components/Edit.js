import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import Info from '@material-ui/icons/Info'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    rootContainer: {
      justifyContent: 'center',
      padding:'6vh',
      flexDirection: 'column',
      alignItems: 'center',
    },
    paper: {
      padding: theme.spacing(3),
      margin: ` 10px auto 10px auto `,
      width:'100%',
      maxWidth:'400px',
      backgroundColor: '#ebebeb',
    },
    image: {
      width: 128,
      height: 128,
      
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
      width: 120,
      height: 120,
      
    },
    avatar: {
      margin: 10,
    },
    iconEdit: {
      '&:hover': {
        color: blue[100],
      },
      width: 35,
      height: 20,
    },
    iconDelete: {
      '&:hover': {
        color: red[100],
      },
      width: 35,
      height: 20,
    },
  }));

export default function Edit() {
    
    const classes = useStyles();
    const [ show, setShow ] = useState(false);

   
    console.log(show);
    return (
        
    );
}