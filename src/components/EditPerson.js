import React from 'react';
import withRoot from '../withRoot'
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

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

function EditPerson({ person, classes, handleChangeField}){
    return (
        <form noValidate autoComplete="off">
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
                            id="gender"
                            select
                            label="Select"
                            //className={classes.textField}
                            value= {person.gender}
                            onChange={handleChangeField('gender','')}
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
                    </Grid>
                    </Grid>
                </Grid>
                </Grid>
            </Grid> 
        </form>
    );
}

export default withRoot(EditPerson);