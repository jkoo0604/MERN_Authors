import React, { useState, useEffect } from 'react';
import { navigate, Link } from '@reach/router';
import axios from 'axios';
import { Paper, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputForm from '../components/InputForm';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
        '& > *': {
            margin: theme.spacing(1),
        },
        flexGrow: 1,
        textAlign: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: 400,
    },
    container: {
        marginTop: 20,
    },
}));

const Edit = props=> {
    const classes = useStyles();
    const {id} = props;
    const [name, setName] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState({});
    const [invalidID, setInvalidID] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/authors/' + id)
            .then(res=> {
                setName(res.data.author.name);
                setLoaded(true);
            })
            .catch(err=>{
                setInvalidID(true)
                setLoaded(true);
            });
    }, []);

    const updateAuthor = name => {
        axios.put('http://localhost:8000/api/authors/update/' + id, {name})
            .then(res=>{
                navigate('/');
            })
            .catch(err=>{
                const errorResponse = err.response.data;
                const errObj = {};
                for (const key of Object.keys(errorResponse)) {
                    errObj[key] = errorResponse[key].properties.message;
                }
                setErrors(errObj);
            })
    }

    return(     
            invalidID ? <Grid container justify="center" className={classes.container}><Paper elevation={3} className={classes.paper}><p>Invalid author. Click below to create one.</p><Link to="/authors/new"><Button variant="contained" color="primary">Create</Button></Link></Paper></Grid> :
            loaded && 
            <InputForm initialName={name} handleSubmit={updateAuthor} err={errors} formText="Edit this author:"/>
    )
}

export default Edit;