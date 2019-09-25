import React from 'react';
import withRoot from '../withRoot'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';




function Person({ person, classes, handleEdit, handleDelete}){

    return (
        <Grid container item xs={12} md lg={12} key={person.pk} justify = {'center'}>
            <Paper className={classes.paper} elevation={8}>
            <Grid container item xs={12} justify="flex-end" style ={{backgroundColor:'transparent'}}>
              <Grid container item xs={4} justify="space-evenly" style ={{backgroundColor:'transparent'}}>
                <Fab color="primary" aria-label="edit" className={classes.iconEdit} onClick={() => handleEdit(person.pk)}>
                  <EditIcon />
                </Fab>
                <Fab color="primary" aria-label="delete" className={classes.iconDelete} onClick={() => handleDelete(person.pk)}>
                  <DeleteOutlinedIcon />
                </Fab>
              </Grid>
            </Grid>
            
            <Grid container spacing={2}>
            <Grid item container xs={12} md = {12} justify={'center'}>
                <Fab className={classes.image}>
                <Avatar alt="complex" src={(person.picture.large)} className={classes.img} />
                </Fab>
            </Grid>
            <Grid item container xs sm justify={'center'} style={{backgroundColor:'transparent'}}>
                <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                    {person.name.title + ' ' + person.name.first + ' ' + person.name.last}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                    Contact: {person.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                    {person.id.value}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    {person.gender}
                    </Typography>
                </Grid>
                </Grid>
                <Grid item>
                <Typography variant="subtitle1">{person.nat}</Typography>
                </Grid>
                
            </Grid>
            </Grid>
            </Paper>
        </Grid> 
    );
}

export default withRoot(Person);