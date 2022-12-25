import React, {useState} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from "@mui/material/CircularProgress";

const Register = () => {

    const navigate = useNavigate();
    const [values, setValues] = useState({ password: '' });
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [open, setOpen] = useState(false);

    const handleChangeEmail = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setEmail(data.get('email'));
    }
    const handleChangeName = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setName(data.get('name'));
    }
    const handleChangeNumber = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setNumber(data.get('number'));
    }
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const [error, setError] = useState('');

    const handleRegister = () => {
        if(email !== "" && name !== "" && number !== "" && values.password !== "") {
            setOpen(true);
            if(!regex.test(email)) {
                setOpen(false);
                setError('Invalid Email address');
                return;
            }
            else {
                setOpen(true);
                localStorage.setItem('Name', name);
                axios.post(`${process.env.REACT_APP_SERVER_URL}/registerApi/`, {
                    name: name,
                    phoneNumber: number,
                    email: email,
                    password: values.password
                  }).then(res => {
                    if(res.data.message === 'Successfully Registered User!') {
                        toast.success("Successfully Registered", {hideProgressBar: true, closeOnClick: true});
                        setOpen(false);
                        navigate('/');
                    }
                    else {
                        setOpen(false);
                        toast.error("You're already Registered!", {hideProgressBar: true, closeOnClick: true});
                    }
                })
            }
        }
        else {
            setOpen(false);
            toast.error("Text Field Can't be Empty", {hideProgressBar: true, closeOnClick: true});
        }
    }

    const paperStyle = { padding: 35, height: '70vh', width: "500px", margin: "28px 400px" }
    return (
        <>
            <Paper elevation={24} style={paperStyle}>
            <div>
                <Dialog open={open}>
                    <DialogTitle><CircularProgress color="success" /></DialogTitle>
                </Dialog>
            </div>
                <Container component="main" maxWidth="xs">
                    <Typography style={{ fontSize: '28px', fontWeight: 'bold' }}>Register Credentials</Typography>
                    <br />
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '45ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        onChange={ handleChangeName }
                    >
                        <TextField id="name" label="Enter your Name*" variant="filled" name="name"/>
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '45ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        onChange={ handleChangeNumber }
                    >
                        <TextField id="number" label="Enter your Phone Number*" variant="filled" name="number"/>
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '45ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        onChange={ handleChangeEmail }
                    >
                        <TextField id="email" label="Enter your Email ID*" variant="filled" name="email"/>
                    </Box>
                    <FormControl sx={{ m: 1, width: '45ch' }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-password">Enter your Password*</InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <br/>
                    <br/>
                    <br/>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <div><Button variant="contained" sx={{ width: '22ch', height:'6ch' }} color="success" onClick = {()=> handleRegister()}>Register</Button></div>
                    </div>
                    <p>{error}</p>
                </Container>
            </Paper>
        </>
    )
}

export default Register;
