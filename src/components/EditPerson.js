import React, { useState } from 'react';
import withRoot from '../withRoot'
import Grid from '@material-ui/core/Grid';
import { Fab, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { email, required } from '../form/validation';
import axios from 'axios'
// eslint-disable-next-line 
import { Field, Form, FormSpy } from 'react-final-form';
//import RFTextField from '../form/RFTextField'
//import FormFeedback from '../form/FormFeedback';
const genders = [
    {
      value: 'male',
      label: 'M',
    },
    {
      value: 'female',
      label: 'F',
    },
  ];


const EditPerson = ({ person, classes, handleClose, ecs_END_POINT }) => {

    const [ editPerson, setEditPerson ] = useState(null);

    if (editPerson === null){
        setEditPerson(person);
    }
    const handleChangeField = (name, mid) => event => {
        event.persist();
        if (mid !== '') {
          setEditPerson(e => ({ ...e, [name]: { ...e[name], [mid]: event.target.value} })); 
        }
        else{
          setEditPerson(e => ({ ...e, [name]: event.target.value })); 
        }
      };

    const validate = values => {
        const errors = required(['email', 'title'], values);
        //console.log(values);
        if (!errors.email) {
          const emailError = email(values.email, values);
          if (emailError) {
            errors.email = email(values.email, values);
          }
        }
    
        return errors;
      };

      // eslint-disable-next-line 
      const [sent, setSent] = React.useState(false);

      const handleSubmit = () => {
        console.log("Submitted");
        replaceEditedPerson(editPerson);
        handleClose(1);
      };

      function replaceEditedPerson(datos){

        return axios.put(`${ecs_END_POINT}/api/v1/contacts/update`,datos)
        .then(function (response) {
          //console.log(response);
          /*
          axios.get(`${ecs_END_POINT}/api/v1/contacts/`)
              .then((response) => {
                  //console.log(response.data);
                  setData(response.data); 
              })
              .catch(function (error) {
                  //console.log(error);
              });
              */
              console.log("Edit false replaceEditedPerson")
        })
        .catch(function (error) {
          console.log(error);
        });
  
        
        
      }

    return (
        <Form onSubmit = {handleSubmit} subscription={{ submitting: true }} validate={validate}>
          {({ handleSubmit2, submitting }) => (
        <form noValidate  autoComplete="off">
            <Grid container item xs={12} md lg={12} key={person.pk} justify = {'center'}>
                <Grid container spacing={2}>
                <Grid item container xs={12} md = {12} justify={'center'}>
                    <Fab className={classes.image}>
                    <Avatar alt="complex" src={(person.picture.large)} className={classes.img} />
                    </Fab>
                </Grid>
                <Grid item container xs sm justify={'center'} style={{backgroundColor:'transparent'}}>
                    <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs container justify={'center'} spacing={1}>
                        <Grid item md={6}>
                            <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            name="title"
                            label="Title"
                            type="text"
                            id="title"
                            error={false}
                            defaultValue = {person.name.title}
                            onChange={handleChangeField('name','title')}
                            />
                           
                            
                        </Grid>
                        
                        <Grid item md={6}>
                            <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            name="name"
                            label="Name"
                            type="text"
                            id="name"
                            error={false}
                            defaultValue ={person.name.first}
                            onChange={handleChangeField('name','first')}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            name="last"
                            label="Last"
                            type="text"
                            id="last"
                            error={false}
                            defaultValue ={person.name.last}
                            onChange={handleChangeField('name','last')}
                            />
                        </Grid>
                        
                        <Grid item md={6}>
                            <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            name="email"
                            label="Email"
                            type="email"
                            id="email"
                            error={false}
                            defaultValue ={person.email}
                            onChange={handleChangeField('email','')}
                            />

                           
                            
                        </Grid>

                        <Grid item md={9}>
                            <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            name="id"
                            label="Id"
                            id="id"
                            error={false}
                            defaultValue ={person.id.value}
                            onChange={handleChangeField('id','value')}
                            />
                        </Grid>
                        <Grid item md={3}>
                            <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            name="nat"
                            label="Nationality"
                            id="nat"
                            error={false}
                            defaultValue ={person.nat}
                            onChange={handleChangeField('nat','')}
                            />
                        </Grid>
                        <Grid item md={12}>
                        <TextField
                            id="gen"
                            name="gen"
                            select
                            label="Select"
                            //className={classes.textField}
                            value= {person.gen}
                            onChange={handleChangeField('gen','')}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                                }}
                            helperText="Please select your gender."
                            margin="normal"
                        >
                            {genders.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                            ))}
                        </TextField>
                        </Grid>
                        <Button onClick={() => handleSubmit()} autoFocus>
                            Save
                        </Button>
                    </Grid>
                    </Grid>
                </Grid>
                </Grid>
            </Grid> 
        </form>)}
        </Form>
    );
}

export default withRoot(React.memo(EditPerson));