import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { people } from '../assets/data/people'
import withRoot from '../withRoot'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(5),
      margin: ` 10px auto 10px auto `,
      maxWidth: 500,
      minWidth: 500,
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
    },
  }));

function Home(){

    const classes = useStyles();

    const World = people.map((person) => {
    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
            <Grid container spacing={2}>
            <Grid item>
                <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={(person.picture.large)} />
                </ButtonBase>
            </Grid>
            <Grid item xs sm container>
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
                    
                    </Typography>
                </Grid>
                </Grid>
                <Grid item>
                <Typography variant="subtitle1">{person.variant}</Typography>
                </Grid>
            </Grid>
            </Grid>
            </Paper>
        </Grid>    
    );
    });

    return <Grid container justify={'center'}>{ World }</Grid>
}

export default withRoot(Home);