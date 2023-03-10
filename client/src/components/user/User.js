import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from 'react';
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddUser from './AddUser';
import EditUser from './EditUser';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const style = {                                     //style for model (Add User/Update User)
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const columns = [                                   //columns for data table
    { id: 'email', label: 'Email', minWidth: 170, },
    { id: 'name', label: 'Name', minWidth: 130 },
    { id: 'gender', label: 'Gender', minWidth: 70, align: 'center' },
    { id: 'mobile', label: 'Mobile', minWidth: 100 },
    { id: 'city', label: 'City', minWidth: 100 },
    { id: 'address', label: 'Address', minWidth: 170 },
    { id: "action", label: 'Action', minWidth: 100 }
];

export default function Users() {
    const [open, setOpen] = useState(false);                //for model (add user)
    const [open2, setOpen2] = useState(false);              // for model (update user)
    const handleClose = () => { setOpen(false); getList() };  //for model (add user)
    const handleClose2 = () => { setOpen2(false); getList() };// for model (update user)
    const [Users, setUsers] = useState([{
        "id": 0,
        "email": "",
        "passwd": "",
        "name": "",
        "gender": "",
        "mobile": "No Data",
        "city": "",
        "address": ""
    }])
    const [Temp, setTemp] = useState([])                    // Edit User Data for temp
    const [database , setDatabase] = useState(true);

    useEffect(() => {
        getList();
    }, [])

    //Get list of users From database 
    const getList = async () => {

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        }

        let response = await fetch("http://localhost:5000/api/users", {
            method: "GET",
            headers: headersList
        });

        const data = await response.json();
        console.log(data);
        if (response.status === 200 && data.length !== 0) {
            setUsers(data)
            setDatabase(false)
        }else if (data.message !== "Cannot read properties of undefined (reading 'query'") {
            setDatabase(true)
            setUsers([{
                "id": 0,
                "email": "",
                "passwd": "",
                "name": "",
                "gender": "",
                "mobile": "No Data",
                "city": "",
                "address": ""
            }])
        }

        // if (data.length === 0) {
        //     setUsers([{
        //         "id": 0,
        //         "email": "",
        //         "passwd": "",
        //         "name": "",
        //         "gender": "",
        //         "mobile": "No Data",
        //         "city": "",
        //         "address": ""
        //     }])
        // }
    }

    //Delete user from database
    const deleteUser = async (id) => {
        Swal.fire({
            title: "Are you sure? ",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.value) {
                let headersList = {
                    "Accept": "*/*",
                    "User-Agent": "Thunder Client (https://www.thunderclient.com)"
                }

                let response = await fetch(`http://localhost:5000/api/user/delete/${id}`, {
                    method: "DELETE",
                    headers: headersList
                });

                let data = await response.json();
                console.log(data);
                if (data.message === "user deleted successfully") {
                    getList()
                    Swal.fire("Deleted!", "User has been deleted.", "success");
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.message
                    });
                    getList()
                }
            }
        });
    };

    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <AddUser Close={handleClose} />
                    </Box>
                </Modal>
                <Modal
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <EditUser usr={Temp} Close={handleClose2} />
                    </Box>
                </Modal>
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <Stack direction="row" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ padding: "20px" }}
                    >
                        Users List
                    </Typography>
                    <Button sx={{ mr: 4 }} onClick={() => { setOpen(true) }} /*disabled={database}*/  variant="contained" startIcon={<PersonAddIcon />}>Add User</Button>
                </Stack>

                <Divider />

                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow >
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {Users.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell size='small' key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    {column.id === 'action' && row.id !== 0 && <Stack spacing={2} direction="row">
                                                        <EditIcon style={{ fontSize: "20px", color: "blue", cursor: "pointer", }} className="cursor-pointer" onClick={() => { setTemp(row); setOpen2(true) }} />
                                                        <DeleteIcon style={{ fontSize: "20px", color: "red", cursor: "pointer", }} onClick={() => { deleteUser(row.id) }} />
                                                    </Stack>}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography component="div" align='right' sx={{m:1, pr:6}}>
                    Count {Users[0].id === 0 ? 0 :Users.length }
                </Typography>
            </Paper>
        </>
    );
}