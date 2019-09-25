import React, { useState, useEffect }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot'
import Grid from '@material-ui/core/Grid';
import { blue, red, grey } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Person from './Person'
import EditPerson from './EditPerson'


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
      '&:hover': {
        backgroundColor: grey[400],
        cursor:'pointer',
      },
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Home(){
    
    const [ edit, setEdit ] = useState(false);
    const [ eliminar, setEliminar ] = useState(false);
    const [ editPerson, setEditPerson ] = useState({gender:'',name:{title:'',first:'',last:'',},email:'',id:{name:'',value:''},picture:{large:'',medium:'',thumbnail:''},nat:''});
    const [ data, setData ] = useState({});
    
    function getPeopleLocalStorage(){
      return JSON.parse(localStorage.getItem('people'));
    }

    function handleDelete(index) {

      var filtered = getPeopleLocalStorage().filter(e => e.pk !== index); 
      localStorage.setItem('people',JSON.stringify(filtered));
      setData(data => ({
        ...data,filtered
      }));

      setEliminar(true);
    }

    useEffect(() => {

    },[eliminar,data]);

    function handleEdit(index) {
      
      console.log(index);
      var persona = (getPeopleLocalStorage().filter(e => e.pk === index ))[0];
      setEditPerson(editPerson => ({...editPerson, 
        gender:persona.gender,
        name:{
          title:persona.name.title,
          first:persona.name.first,
          last:persona.name.last},
        email:persona.email,
        id:{
          name:persona.id.name,
          value:persona.id.value
        },
        picture:{
          large:persona.picture.large,
          medium:persona.picture.medium,
          thumbnail:persona.picture.thumbnail
        }
      }));
      setEdit(true);
    }

    function handleClose(){
        setEdit(false);
    }

    const classes = useStyles();
    const World = getPeopleLocalStorage().map(person => {
    return (<Person person={person} classes={classes} handleDelete={handleDelete} handleEdit={handleEdit} key={person.pk}/>);
    });

    return (
      <Grid container className={classes.rootContainer}>
      { World }
        <Dialog
          open={edit}
          onClose={handleClose}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Edit Mode"}</DialogTitle>
          <DialogContent className={classes.dialogContent}>
          <EditPerson  person={editPerson} classes={classes}/>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleClose} autoFocus>
              Save
          </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      );
}

export default withRoot(Home);