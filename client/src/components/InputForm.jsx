import React, { useState } from 'react';
import { TextField, Button, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from '@reach/router';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
        '& > *': {
            margin: theme.spacing(1),
        },
        width: 400,
        flexGrow: 1,
        margin: 'auto',
        marginTop: 20,
        padding: theme.spacing(1, 4, 4, 4),
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    container: {
        margin: 0,
    },
    customButton: {
        margin: 10,
    }
}));

const InputForm = props => {
    const classes = useStyles();
    const { initialName, err, handleSubmit, formText } = props;
    const [name, setName] = useState(initialName);

    const formSubmit = e => {
        e.preventDefault();
        handleSubmit(name);
    }

    return(
        <Paper className={classes.root}>
            <Grid container justify="flex-end" className={classes.container}>
                <Link to="/"><Button variant="outlined" size="small" className={classes.createButton} startIcon={<HomeIcon/>}>Home</Button></Link>
            </Grid>
            <Grid container justify="center" className={classes.container}>
                <Grid item xs={12}>
                    <h2>Favorite Authors</h2>
                </Grid>
            </Grid>
            <Grid container justify="center" className={classes.container}>
                <Grid item xs={12}>{formText}</Grid>
                <Grid item xs={12}>
                    <form onSubmit={formSubmit}>
                        <TextField required error={err['name'] ? true : false} id={"filled-required" + (err['name'] ? ' filled-error-helper-text' : '')} label="Name" helperText={err['name']} variant="filled" onChange={(e) => setName(e.target.value)} value={name}/>
                        <Grid item xs={12} justify="space-evenly">
                            <Link to="/"><Button variant="outlined" size="small" className={classes.customButton}>Cancel</Button></Link>
                            <Button variant="contained" size="small" color="primary" type="submit" className={classes.customButton}>Submit</Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default InputForm;