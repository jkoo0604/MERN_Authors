import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Grid, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 700,
        flexGrow: 1,
        margin: 'auto',
        marginTop: 20,
        padding: theme.spacing(1, 4),
        height: '580px',
    },
    container: {
        maxHeight: 460,
    },
    button: {
        margin: theme.spacing(1),
        color: '#b0bec5',
        borderColor: '#b0bec5'
    },
    customButton: {
        margin: theme.spacing(1),
        backgroundColor: '#ffd54f',
    },
    createButton: {
        margin: theme.spacing(1),
        backgroundColor: '#4dd0e1',
        color: 'white'
    },
    cell: {
        paddingLeft: 100,
    },
    font: {
        fontWeight: 600,
        fontSize: 15,
    }
}));

const All = () => {
    const classes=useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/authors')
            .then(res=>{
                setAuthors(res.data.authors);
            })
    }, []);

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = e => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    };

    const handleDelete = id => {
        axios.delete('http://localhost:8000/api/authors/delete/' + id)
            .then(res=>{
                setAuthors(authors.filter(author=>author._id !== id))
            })
    }

    return(
        <Paper className={classes.root}>
            <Grid container justify="center">
                <Grid item xs={10}>
                    <h1>Favorite Authors</h1>
                </Grid>
                <Grid item xs={2}>
                    <Link to="/authors/new"><Button variant="contained" size="small" color="primary" className={classes.createButton} startIcon={<AddIcon/>}>Create</Button></Link>
                </Grid>
            </Grid>
            <TableContainer className={classes.container}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className={classes.font}>Author</TableCell>
                            <TableCell align="center" className={classes.font}>Available Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {authors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">
                                    <Link to={`/authors/edit/${row._id}`}><Button variant="contained" size="small" color="primary" className={classes.customButton} startIcon={<EditIcon/>}>Edit</Button></Link>
                                    <Button variant="outlined" size="small" color="secondary" className={classes.button} startIcon={<DeleteIcon/>} onClick={()=>handleDelete(row._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination rowsPerPageOptions={[5, 10, 15]} component="div" count={authors.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage}/>
        </Paper>
    )
}

export default All;