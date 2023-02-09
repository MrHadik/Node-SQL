import * as React from 'react';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';


let ss = {}

export default function AddUser({ id }) {

    // const [Data, setData] = useState([])
    const [formData, setFormData] = useState([
        {
            "email": "",
            "passwd": "",
            "name": "",
            "gender": "",
            "mobile": 0,
            "city": "",
            "address": ""
        }
    ])

    useEffect(() => {
        console.log(id)
        if (id !== 0) {
            getData(id)
        }
        else {
            ss = {}
        }
    }, [])

    const getData = async (id) => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        }

        let response = await fetch(`http://localhost:5000/api/user/${id}`, {
            method: "GET",
            headers: headersList
        });

        let data = await response.json();
        console.log(data[0]);
        setFormData(data);
        ss = data[0];
    }

    const handelSubmit = async (e) => {

        e.preventDefault();
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
           }

        console.log(formData);
           
           let bodyContent = JSON.stringify(formData);
           
           let response = await fetch("http://localhost:5000/api/user/add", { 
             method: "POST",
             body: bodyContent,
             headers: headersList
           });
           
           let data = await response.text();
           console.log(data+  " is aupdaye");
           
        console.log(formData);

    }

    const onChange = (e) => {
        setFormData({ ...FormData[0], [e.target.id]: e.target.value });
    };

    return (
        <>
            <Typography
                variant="h5"
                align='center'
                sx={{ padding: "20px" }}
            >
                {(id===0? 'Add User': 'Update User')}
            </Typography>
            {console.log(formData)}
            <Grid container spacing={2} component="form" onSubmit={handelSubmit}>
                <Grid item xs={12}>
                    <TextField required
                        id="email"
                        label="Email"
                        size="small"
                        onChange={onChange}
                        type="email"
                        defaultValue={ss.email} //{(formData).length !== 0 ? formData[0].email : 'isis'}

                        variant="outlined"
                        sx={{ minWidth: '100%' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField required
                        id="passwd"
                        label="Password"
                        size="small"
                        onChange={onChange}
                        type="text"
                        defaultValue={ss.passwd}
                        variant="outlined"
                        sx={{ minWidth: '100%' }}
                    />
                </Grid>
                <Grid item xs={6}>

                    <TextField required
                        id="name"
                        label="Name"
                        size="small"
                        defaultValue={ss.name}
                        onChange={onChange}
                        type="text"
                        variant="outlined"
                        sx={{ minWidth: '100%' }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <RadioGroup
                        row
                        id='gender'
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue={ss.gender}
                        onChange={onChange}
                    >
                        <FormControlLabel value="F" control={<Radio required />} label="Female" />
                        <FormControlLabel value="M" control={<Radio required />} label="Male" />
                    </RadioGroup>
                </Grid>
                <Grid item xs={6}>

                    <TextField required
                        id="mobile"
                        label="Number"
                        defaultValue={ss.mobile}
                        type="number"
                        onChange={onChange}
                        size="small"
                        variant="outlined"
                        sx={{ minWidth: '100%' }}
                    />
                </Grid>

                <Grid item xs={6}>

                    <TextField required
                        id="city"
                        onChange={onChange}
                        label="City"
                        type="text"
                        defaultValue={ss.city}
                        size="small"
                        variant="outlined"
                        sx={{ minWidth: '100%' }}
                    />
                </Grid>
                <Grid item xs={12}>

                    <TextField required
                        id="address"
                        label="Address"
                        multiline
                        rows={4}
                        onChange={onChange}
                        type="text"
                        size="small"
                        defaultValue={ss.address}
                        variant="outlined"
                        sx={{ minWidth: '100%' }}
                    />
                </Grid>
                <Grid item xs={12}>

                    <Button sx={{ padding: "8px", minWidth: '100%' }} type='submit' size='small' variant="contained" startIcon={<PersonAddIcon />}>Add User</Button>
                </Grid>
            </Grid>
        </>
    );
}