import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
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
import PersonAddIcon from '@mui/icons-material/PersonAdd';


// import '../../App.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const columns = [
    { id: 'email', label: 'Email', minWidth: 170, },
    { id: 'name', label: 'Name', minWidth: 130 },
    { id: 'gender', label: 'Gender', minWidth: 70, align: 'center' },
    { id: 'mobile', label: 'Mobile', minWidth: 100 },
    { id: 'city', label: 'City', minWidth: 100 },
    { id: 'address', label: 'Address', minWidth: 170 },
    { id: "action", label: 'Action', minWidth: 100 }
];

export default function Users() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [Users, setUsers] = useState([])

    useEffect(() => {
        getList();
    }, [])

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
        setUsers(data)
        console.log(data)
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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

    const [temp,setTemp] = useState([])
    const editUser = async (id) => {
        // console.log('edit ' + id)
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        }
        let response = await fetch(`http://localhost:5000/api/user/${id}`, {
            method: "GET",
            headers: headersList
        });
        let data = await response.json()
        setTemp(JSON.stringify(data))
        setOpen(true)
        // console.log(JSON.stringify(temp));
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
                        <AddUser US={temp} />
                    </Box>
                </Modal>
            </div> 
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <Stack spacing={2} direction="row" >
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ padding: "20px" }}
                    >
                        Users List
                    </Typography>
                    <Button sx={{ padding: "10px" }} onClick={handleOpen} variant="outlined" startIcon={<PersonAddIcon />}>Add User</Button>
                </Stack>
                <Divider />

                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
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
                            {
                                Users.map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        {column.id === 'action' && <Stack spacing={2} direction="row">
                                                            <EditIcon style={{ fontSize: "20px", color: "blue", cursor: "pointer", }} className="cursor-pointer" onClick={() => editUser(row.id)} />
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
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={Users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}