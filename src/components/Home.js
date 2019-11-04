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
import ShowPerson from './ShowPerson'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';



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
    iconAdd: {
      '&:hover': {
        color: blue[100],
      },
      width: 80,
      height: 80,
      //position: 'fixed',
      //top: '0.5vh',
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
    headerBar: {
      background: 'transparent',
      //position: '-webkit-sticky',
      //position: 'sticky',
      top: 20,
      bottom: 20, 
      paddingTop: '40px',
      paddingBottom: '40px',
      zIndex: 5,
      justifyContent:'center',
    },
  }));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Home(){
    
    const emptyPerson =  {pk:'',gender:'',name:{title:'',first:'',last:'',},email:'',id:{name:'',value:''},picture:{large:'',medium:'',thumbnail:''},nat:''};
    const [ edit, setEdit ] = useState(false);
    const [ nuevo, setNuevo ] = useState(false);
    const [ show, setShow ] = useState(false);
    const [ id, setId ] = useState(0);
    const [ countP, setcountP] = useState(6);
    const [ eliminar, setEliminar ] = useState(false);
    const [ editPerson, setEditPerson ] = useState({pk:'',gender:'',name:{title:'',first:'',last:'',},email:'',id:{name:'',value:''},picture:{large:'',medium:'',thumbnail:''},nat:''});
    //const [ data, setData ] = useState({pk:'',gender:'',name:{title:'',first:'',last:'',},email:'',id:{name:'',value:''},picture:{large:'',medium:'',thumbnail:''},nat:''});
    

    

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

      setEdit(true);
    }

    function handleClose(i){

      if (i === 1) {
        replaceObject(editPerson);
      }

      //Nuevo Registro
      if ((editPerson.pk === '') && (i === 1)) {
        let temp = editPerson;
        temp = {
          ...editPerson,
          pk:countP,
        };
        setcountP(countP + 1);
        setEditPerson(editPerson => ({
          ...editPerson,
          pk:countP,
        }));
        addObject(temp);
        setNuevo(false);
      }
      else if(i === 2){
        setShow(false);
      }
      else{
        editPerson.pk === '' ?  setNuevo(false):setEdit(false);
      }

      setEditPerson(emptyPerson);
      
    }

    const handleChangeField = (name, mid) => event => {
      if (mid !== '') {
        setEditPerson({ ...editPerson, [name]: { ...editPerson[name], [mid]: event.target.value} }); 
      }
      else{
        setEditPerson({ ...editPerson, [name]: event.target.value }); 
      }
    };

    function handleNuevo(i){
      setNuevo(true);
    }

    function showPerson(i){
      var persona = (getPeopleLocalStorage().filter(e => e.pk === i ))[0];
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
      setShow(true);
    }

    function handleCloseDeleteYes(){
      var filtered = getPeopleLocalStorage().filter(e => e.pk !== id); 
      localStorage.setItem('people',JSON.stringify(filtered));
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

    function addObject(datos){
      
      let actual = getPeopleLocalStorage();
      actual.push(datos);
      localStorage.setItem('people',JSON.stringify(actual));
    }

    const classes = useStyles();
    const World = getPeopleLocalStorage().map(person => {
    return (<Person person={person} classes={classes} handleDelete={handleDelete} handleEdit={handleEdit} showPerson={showPerson} key={person.pk}/>);
    });

    return (
      <Grid container className={classes.rootContainer}>
        <Grid container item className={classes.headerBar} >
        <Tooltip title="Add New Contact" aria-label="add">
          <Fab color={'secondary'} aria-label="add" className={classes.iconAdd} onClick={handleNuevo}>
            <AddIcon style={{width:'50',height:'50'}} />
          </Fab>
        </Tooltip>
        </Grid>
        <Grid container>
          { World }
        </Grid>
        <Dialog
          open={edit}
          onClose={() => handleClose(0)}
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
          <Button onClick={() => handleClose(1)} autoFocus>
              Save
          </Button>
          <Button onClick={() => handleClose(0)} autoFocus>
              Cancel
          </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={eliminar}
          //onClose={handleCloseDelete}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableBackdropClick = {true}
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure to delete this contact?"}</DialogTitle>
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
        <Dialog
          open={nuevo}
          onClose={handleClose}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableBackdropClick = {true}
        >
          <DialogTitle id="alert-dialog-title">{"New Mode"}</DialogTitle>
          <DialogContent className={classes.dialogContent}>
          <EditPerson  person={editPerson} classes={classes} handleChangeField={handleChangeField} />
          </DialogContent>
          <DialogActions>
          <Button onClick={() => handleClose(1)} autoFocus>
              Save
          </Button>
          <Button onClick={() => handleClose(0)} autoFocus>
              Cancel
          </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={show}
          onClose={handleClose}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableBackdropClick = {true}
        >
          <DialogTitle id="alert-dialog-title">{"Show Mode"}</DialogTitle>
          <DialogContent className={classes.dialogContent}>
          <ShowPerson person={editPerson} classes={classes}/>
          </DialogContent>
          <DialogActions>
          <Button onClick={() => handleClose(2)} autoFocus>
              Dismiss
          </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      );
}

export default withRoot(Home);