import React, {useState} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button'; 
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from "@mui/material/CircularProgress";

const OtpVerify = (props) => {
    const {loadHandler} = props;
    const navigate = useNavigate();

    const [number, setNumber] = useState('');
    const [open, setOpen] = useState(false);

    const handleChangeNumber = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setNumber(data.get('number'));
    }
    const handleSendOtp = () => {
        if(number !== "") {
            setOpen(true);
            loadHandler(true);
            axios.post(`${process.env.REACT_APP_SERVER_URL}/loginWithOtpApi/`, {
                phoneNumber: number
              }).then(res => {
                if(res.data.message === 'Verified Successfully') {
                    toast.success(res.data.message, {hideProgressBar: true, closeOnClick: true});
                    setOpen(false);
                    navigate('/home');
                }
                else {
                    setOpen(false);
                    toast.error(res.data.message, {hideProgressBar: true, closeOnClick: true});
                }
            });
        }
        else {
            setOpen(false);
            toast.error("Text Field Can't be Empty", {hideProgressBar: true, closeOnClick: true});
        }
    }

    const paperStyle = { padding: 35, height: '40vh', width: "500px", margin: "28px 400px" }
    return (
        <>
            <Paper elevation={24} style={paperStyle}>
            <div>
                <Dialog open={open}>
                    <DialogTitle><CircularProgress color="success" /></DialogTitle>
                </Dialog>
            </div>
                <Container component="main" maxWidth="xs">
                    <Typography style={{ fontSize: '28px', fontWeight: 'bold' }}>Phone Number Verification</Typography>
                    <br />
                    <div>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '45ch' },
                            }}
                            noValidate
                            autoComplete="off"
                            onChange={ handleChangeNumber }
                        >
                            <TextField id="number" label="Enter Register Phone Number" variant="filled" name="number"/>
                        </Box>
                        <br/>
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <div><Button variant="contained" sx={{ width: '22ch',height:'6ch' }} onClick = {()=> handleSendOtp()} >Verify</Button></div>
                        </div>
                    </div>
                </Container>
            </Paper>
        </>
    )
}

export default OtpVerify;
