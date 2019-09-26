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
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';


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
    menu: {
      width: 200,
    },
  }));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Home(){
    
    const [ edit, setEdit ] = useState(false);
    const [ nuevo, setNuevo ] = useState(false);
    const [ id, setId ] = useState(0);
    const [ eliminar, setEliminar ] = useState(false);
    const [ editPerson, setEditPerson ] = useState({pk:'',gender:'',name:{title:'',first:'',last:'',},email:'',id:{name:'',value:''},picture:{large:'',medium:'',thumbnail:''},nat:''});
    const [ data, setData ] = useState({pk:'',gender:'',name:{title:'',first:'',last:'',},email:'',id:{name:'',value:''},picture:{large:'',medium:'',thumbnail:''},nat:''});
    
    function getPeopleLocalStorage(){
      return JSON.parse(localStorage.getItem('people'));
    }

    function handleDelete(index) {
     setId(index);
      setEliminar(true);
    }

    useEffect(() => {

    },[editPerson]);

    function handleEdit(index) {

      var persona = (getPeopleLocalStorage().filter(e => e.pk === index ))[0];
      setEditPerson(editPerson => ({...editPerson, 
        gender:persona.gender,
        pk:persona.pk,
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
        },
        nat:persona.nat
      }));

      setData(data => ({...data, 
        gender:persona.gender,
        pk:persona.pk,
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
        },
        nat:persona.nat
      }));

      setEdit(true);
    }

    function handleClose(){
      replaceObject(data);
      setEdit(false);
    }

    function handleCloseDeleteYes(){
      var filtered = getPeopleLocalStorage().filter(e => e.pk !== id); 
      localStorage.setItem('people',JSON.stringify(filtered));
      setData(data => ({
        ...data,filtered
      }));
      setEliminar(false);
    }
    function handleCloseDeleteNo(){
      setEliminar(false);
    }

    function replaceObject(datos){
      let actual = getPeopleLocalStorage();
      

      for (let index = 0; index < actual.length; index++) {
        if (actual[index].pk === datos.pk) {
          actual.splice(index,1,datos);
        }
      }

      localStorage.setItem('people',JSON.stringify(actual));
      
    }

    const handleChangeField = (name,mid) => event => {
        if (mid !== '') {
          setData({ ...data, [name]: {...data[name], [mid]: event.target.value} }); 
        }
        else{
          setData({ ...data, [name]: event.target.value }); 
        }
        
    };

    const classes = useStyles();
    const World = getPeopleLocalStorage().map(person => {
    return (<Person person={person} classes={classes} handleDelete={handleDelete} handleEdit={handleEdit} key={person.pk}/>);
    });

    return (
      <Grid container className={classes.rootContainer}>
      <Fab color="secondary" aria-label="edit" className={classes.iconEdit}>
        
      </Fab>
      { World }
        <Dialog
          open={edit}
          onClose={handleClose}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableBackdropClick = {true}
        >
          <DialogTitle id="alert-dialog-title">{"Edit Mode"}</DialogTitle>
          <DialogContent className={classes.dialogContent}>
          <EditPerson  person={editPerson} classes={classes} handleChangeField={handleChangeField}/>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleClose} autoFocus>
              Save
          </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={nuevo}
          //onClose={handleCloseDelete}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableBackdropClick = {true}
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent className={classes.dialogContent}>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleCloseDeleteYes} autoFocus>
              Yes
          </Button>
          <Button onClick={handleCloseDeleteNo} autoFocus>
              No
          </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      );
}

export default withRoot(Home);