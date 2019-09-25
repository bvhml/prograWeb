import React from 'react';
import withRoot from '../withRoot'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Avatar from '@material-ui/core/Avatar';

function EditPerson({ person, classes}){

    return (
        <Grid container item xs={12} md lg={12} key={person.pk} justify = {'center'}>
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
        </Grid> 
    );
}

export default withRoot(EditPerson);