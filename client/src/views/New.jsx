import React, { useState } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import InputForm from '../components/InputForm';

const New = () => {
    const [errors, setErrors] = useState({});

    const createAuthor = name => {
        console.log(name);
        axios.post('http://localhost:8000/api/authors/new', {name})
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
        <InputForm initialName="" handleSubmit={createAuthor} err={errors} formText="Add a new author:"/>
    )
}

export default New;