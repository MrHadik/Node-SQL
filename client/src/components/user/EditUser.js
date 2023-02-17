import * as React from 'react';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Swal from "sweetalert2";



export default function EditUser({ usr, Close }) {            //usr is the user   // Close is for closing model
  const [data, setData] = useState({
    "email": usr.email,
    "passwd": usr.passwd,
    "name": usr.name,
    "gender": usr.gender,
    "mobile": usr.mobile,
    "city": usr.city,
    "address": usr.address
  });

  const onChange = (e) => {
    if (e.target.id === '') {
      setData({ ...data, ['gender']: e.target.value });
    } else {
      setData({ ...data, [e.target.id]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value });
    }
  };

  // For Update User 
  const handelSubmit = async (e) => {
    e.preventDefault();

    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify(data);

    let response = await fetch("http://localhost:5000/api/user/update", {
      method: "PUT",
      body: bodyContent,
      headers: headersList
    });
 
    let getData = await response.json();
    if (getData.message === "User Update successfully") {
      Close();
      Swal.fire("Update!", getData.message, "success");
    }
    else {
      Close();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: getData.message
      });
    }
  }

  return (
    <div>
      <>
        <Typography
          variant="h5"
          align='center'
          sx={{ padding: "20px" }}
        >
          Edit User
        </Typography>
        <Grid container spacing={2} component="form" onSubmit={handelSubmit}>
          <Grid item xs={12}>
            <TextField required
              id="email"
              disabled
              label="Email"
              size="small"
              onChange={onChange}
              type="email"
              defaultValue={data.email}
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
              defaultValue={data.passwd}
              variant="outlined"
              sx={{ minWidth: '100%' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField required
              id="name"
              label="Name"
              size="small"
              defaultValue={data.name}
              onChange={onChange}
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
              defaultValue={data.gender}
            >
              <FormControlLabel id='gender' onChange={onChange} value="Male" control={<Radio required size='small'/>} label="Male" />
              <FormControlLabel id='gender' onChange={onChange}  value="Female" control={<Radio required size='small'/>} label="Female" />
              <FormControlLabel id='gender' onChange={onChange} value="other" control={<Radio required size='small'/>} label="other" />
            </RadioGroup>
          </Grid>
          <Grid item xs={6}>
            <TextField required
              id="mobile"
              label="Number"
              defaultValue={data.mobile}
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
              defaultValue={data.city}
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
              defaultValue={data.address}
              variant="outlined"
              sx={{ minWidth: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button sx={{ padding: "8px", minWidth: '100%' }} type='submit' size='small' variant="contained" startIcon={<PersonAddIcon />}>Add User</Button>
          </Grid>
        </Grid>
      </>
    </div>
  );
};