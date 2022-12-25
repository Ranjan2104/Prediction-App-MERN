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
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from "@mui/material/CircularProgress";

const Login = (props) => {
    const {loadHandler} = props;
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const [values, setValues] = useState({ password: '' });
    const [email, setEmail] = useState('');
    const handleChangeEmail = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setEmail(data.get('email'));
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

    const handleLogin = () => {
        setOpen(true);
        if(email !== "" && values.password !== "") {
            loadHandler(true);
            axios.post(`${process.env.REACT_APP_SERVER_URL}/loginApi/`, {
                email: email,
                password: values.password
              }).then(res => {
                if(res.data.message === 'Login Successfully') {
                    toast.success(res.data.message, {hideProgressBar: true, closeOnClick: true});
                    setOpen(false);
                    navigate('/home');
                }
                else {
                    setOpen(false);
                    toast.error(res.data.message, {hideProgressBar: true, closeOnClick: true});
                }
            })
        }
        else {
            setOpen(false);
            toast.error("Text Field Can't be Empty", {hideProgressBar: true, closeOnClick: true});
        }
    }
    const handleRegister = () => {
        navigate('/register')
    }
    const handleOtpSubmit = () => {
        navigate('/otpVerify')
    }
    
    const paperStyle = { padding: 35, height: '55vh', width: "500px", margin: "28px 400px" }
    return (
        <>
            <Paper elevation={24} style={paperStyle}>
            <div>
                <Dialog open={open}>
                    <DialogTitle><CircularProgress color="success" /></DialogTitle>
                </Dialog>
            </div>
                <Container component="main" maxWidth="xs">
                    <Typography style={{ fontSize: '28px', fontWeight: 'bold' }}>Login Credentials</Typography>
                    <br />
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '45ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        onChange={ handleChangeEmail }
                    >
                        <TextField id="email" label="Enter your Email ID*   " variant="filled" name="email"/>
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
                    <div style={{display:"flex", paddingLeft:"10px"}}>
                        <div><Button variant="contained" sx={{ width: '22ch',height:'6ch' }} onClick = {()=> handleLogin()}>Login</Button></div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div><Button variant="contained" sx={{ width: '22ch', height:'6ch' }} color="success" onClick = {()=> handleRegister()}>Register</Button></div>
                    </div>
                    <div style={{paddingTop:"30px", display:"flex"}}>
                        <span style={{paddingLeft:"12px"}}>Or Login with Phone Number</span>
                        <div style={{marginTop:"-6px"}}>
                            <Button onClick={() => handleOtpSubmit()}>Click Here <PhoneAndroidIcon /> </Button>
                        </div>
                    </div>
                </Container>
            </Paper>
        </>
    )
}

export default Login;
