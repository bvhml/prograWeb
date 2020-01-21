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
import CircularProgress from '@material-ui/core/CircularProgress';
//import ContactHelpers from '../services/contactsHelpers'
import axios from 'axios'
import log from './log';
//import { CONNREFUSED } from 'dns';

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
    progress:{
      margin: ` 100px auto 10px auto `,
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
    
    const emptyPerson =  { _id:'', pk:'',gen:'',name:{title:'',first:'',last:'',},email:'',id:{name:'',value:''},picture:{large:'',medium:'',thumbnail:''},nat:''};
    const [ edit, setEdit ] = useState(false);
    const [ nuevo, setNuevo ] = useState(false);
    const [ show, setShow ] = useState(false);
    const [ id, setId ] = useState(0);
    const [ countP, setcountP] = useState(6);
    const [ eliminar, setEliminar ] = useState(false);
    const [ data, setData ] = useState(null);
    const [ editPerson, setEditPerson ] = useState({ _id:'', pk:'',gen:'',name:{title:'',first:'',last:'',},email:'',id:{name:'',value:''},picture:{large:'',medium:'',thumbnail:''},nat:''});
    const classes = useStyles();
    let World = null;
    

    function handleDelete(index) {
      setId(index);
      setEliminar(true);
    }

    useEffect(() => {
      
      axios.get('http://localhost:3030/api/v1/contacts/')
            .then((response) => {
                //console.log(response.data);
                setData(response.data);
            })
            .catch(function (error) {
                //console.log(error);
            });
    },[edit])

    async function handleEdit(index) {
      var persona = (data.filter(e => e._id === index ))[0];
      setEditPerson(editPerson => ({...editPerson,
        _id: persona._id, 
        gen:persona.gen,
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
      console.log("Edit true")
    }

    function handleClose(i){

      if ((editPerson.pk !== '') && (i === 1)) {
        replaceObject(editPerson);
        console.log("Edit false por handleClose")
        setEdit(false);
        setEditPerson(emptyPerson);
        return true;
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
        editPerson.pk === '' ?  setNuevo(false):console.log("Edit False porque no hay pk"); setEdit(false);
      }

      setEditPerson(emptyPerson);

      
      
    }
    
    //console.log("Parent Render");
    const handleChangeField = (name, mid) => event => {
      
      if (mid !== '') {
        setEditPerson(e => ({ ...e, [name]: { ...e[name], [mid]: event.target.value} })); 
      }
      else{
        setEditPerson(e => ({ ...e, [name]: event.target.value })); 
      }
      event.preventDefault();
      event.stopPropagation();
      
    };

    function handleNuevo(i){
      setNuevo(true);
    }

    function showPerson(i){
      var persona = (data.filter(e => e._id === i ))[0];
      setEditPerson(editPerson => ({...editPerson,
        _id: persona._id,  
        gen:persona.gen,
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
      axios.delete('http://localhost:3030/api/v1/contacts/delete/' + id)
      .then(function (response) {
        /*
        axios.get('http://localhost:3030/api/v1/contacts/')
            .then((response) => {
                //console.log(response.data);
                setData(response.data); 
            })
            .catch(function (error) {
                //console.log(error);
            });
            */
      })
      .catch(function (error) {
        console.log(error);
      });

      setEliminar(false);
    }

    function handleCloseDeleteNo(){
      setEliminar(false);
    }

    function replaceObject(datos){

      return axios.put('http://localhost:3030/api/v1/contacts/update',datos)
      .then(function (response) {
        //console.log(response);
        /*
        axios.get('http://localhost:3030/api/v1/contacts/')
            .then((response) => {
                //console.log(response.data);
                setData(response.data); 
            })
            .catch(function (error) {
                //console.log(error);
            });
            */
            console.log("Edit false")
        setEdit(false);
      })
      .catch(function (error) {
        console.log(error);
      });

      
      
    }

    async function addObject(datos){
      //console.log(datos);
      return axios.post('http://localhost:3030/api/v1/contacts/add', datos)
      .then(function (response) {
        //console.log(response);
        /*
        axios.get('http://localhost:3030/api/v1/contacts/')
            .then((response) => {
                //console.log(response.data);
                setData(response.data); 
            })
            .catch(function (error) {
                //console.log(error);
            });
            */
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    
    
    if (data !== null) {
      World = () => { 
        console.log(show);
        if (!show) {
          console.log("Render World");
          let result = data.map(person => {
            return (<Person person={person} classes={classes} handleDelete={handleDelete} handleEdit={handleEdit} showPerson={showPerson} key={person.pk}/>);
            });
            return (<Grid container>{ result } </Grid>)
        }
      };
    }
    else{
      World = () => { 
        return (<CircularProgress disableShrink className={ classes.progress } color="secondary" size={"75px"}/>)
      };
    }
    return (
      <Grid container className={classes.rootContainer}>
        <Grid container item className={classes.headerBar} >
        <Tooltip title="Add New Contact" aria-label="add">
          <Fab color={'secondary'} aria-label="add" className={classes.iconAdd} onClick={handleNuevo}>
            <AddIcon style={{width:'50',height:'50'}} />
          </Fab>
        </Tooltip>
        </Grid>
          {World()}
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
          <Button onClick={() => handleClose(0)}>
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

export default log(withRoot(Home));