import * as React from 'react';
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
// import { minWidth } from '@mui/system';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';



export default function AddUser(props) {

    // const [Data, setData] = useState([])
    const [formData, setFormData] = useState([])

    useEffect(() => {
        if ((props.US).length !== 0) {
            // console.log(JSON.parse(props.US))
            let te = JSON.parse(props.US)
            setFormData(te[0])
            // console.log(te[0])
        }
    }, [])

    const handelSubmit = (e) => {

        e.preventDefault();
        console.log('form is submitted');

    }


    return (
        <>
            <Typography
                variant="h5"
                align='center'
                sx={{ padding: "20px" }}
            >
                Add User
            </Typography>
            {console.log(formData.email)}
            <Grid container spacing={2} component="form" onSubmit={handelSubmit}>
                <Grid item xs={12}>
                    <TextField required
                        id="outlined-basic"
                        label="Email"
                        size="small"
                        type="email"
                        defaultValue={formData.email}
                        
                        variant="outlined"
                        sx={{ minWidth: '100%' }}
                    />
                </Grid>
                <Grid item xs={6}>

                    <TextField required
                        id="outlined-basic"
                        label="Name"
                        size="small"
                        defaultValue={formData.name}
                        type="text"
                        variant="outlined"
                        sx={{ minWidth: '100%' }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio required />} label="Female" />
                        <FormControlLabel value="male" control={<Radio required />} label="Male" />
                    </RadioGroup>
                </Grid>
                <Grid item xs={6}>

                    <TextField required
                        id="outlined-basic"
                        label="Number"
                        defaultValue={formData.number}
                        type="number"
                        size="small"
                        variant="outlined"
                        sx={{ minWidth: '100%' }}
                    />
                </Grid>

                <Grid item xs={6}>

                    <TextField required
                        id="outlined-basic"
                        label="City"
                        type="text"
                        defaultValue={formData.city}
                        size="small"
                        variant="outlined"
                        sx={{ minWidth: '100%' }}
                    />
                </Grid>
                <Grid item xs={12}>

                    <TextField required
                        id="outlined-basic"
                        label="Address"
                        multiline
                        rows={4}
                        type="text"
                        size="small"
                        defaultValue={formData.AddUser}
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