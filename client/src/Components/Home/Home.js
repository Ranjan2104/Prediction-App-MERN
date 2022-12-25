import React, {useState} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from "@mui/material/CircularProgress";

const Home = () => {

    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState('');
    const [changeInput, setChangeInput] = useState(true);
    const [changePredict, setChangePredict] = useState(false);

    const handleChangeValue = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setValue(data.get('value'));
    }
    const handlePredict = () => {
        setOpen(true);
        setChangeInput(false);
        setChangePredict(true);
        axios.post(`${process.env.REACT_APP_SERVER_URL}/scriptApi/`, {
            priceValue: value,
            periodID: value * 255
          }).then(res => {
            setResult(res.data.message);
            if(res.data.message === 'Red') {
                setOpen(false);
                toast.error(res.data.message, {hideProgressBar: true, closeOnClick: true});
            }
            else {
                setOpen(false);
                toast.success(res.data.message, {hideProgressBar: true, closeOnClick: true});
            }
        })
    }
    const handleBack = () => {
        setOpen(true);
        setChangeInput(true);
        setChangePredict(false);
        setOpen(false);
    }
    
    const paperStyle = { padding: 35, height: '63vh', width: "500px", margin: "28px 400px" }
    return (
        <>
            <Paper elevation={24} style={paperStyle}>
            <div>
                <Dialog open={open}>
                    <DialogTitle><CircularProgress color="success" /></DialogTitle>
                </Dialog>
            </div>
                <Container component="main" maxWidth="xs">
                    <Typography style={{ fontSize: '28px', fontWeight: 'bold' }}>Welcome to Parity Server Prediction 😈</Typography>
                    <br />
                    {changeInput && <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '45ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        onChange={ handleChangeValue }
                    >
                        <TextField id="value" label="Enter Current Price Amount*" variant="filled" name="value"/>
                        <TextField id="xxx" label="Enter Period ID*" variant="filled" name="xxxx"/>
                        <br/>
                        <br/>
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <div><Button variant="contained" sx={{ width: '22ch',height:'6ch' }} onClick = {()=> handlePredict()} color="error">Predict Result</Button></div>
                        </div>
                    </Box>}
                    {changePredict && <div>
                        <h2>Color - { result === "Red" || result === "Green" ? result : "Server Error 404" } </h2>
                            {
                                result === "Red" ? <div>
                                <img src='https://media-cldnry.s-nbcnews.com/image/upload/newscms/2016_14/1038581/red-dot-puzzle-before-today-160406.jpg' height="40px" width= "40px" />
                                </div> :  result === "Green" ? <div>
                                <img src='https://w7.pngwing.com/pngs/980/921/png-transparent-green-dot-corporation-business-cercle-de-fermieres-d-ahuntsic-thumbnail.png' height="40px" width= "40px" />
                                </div> : ""  
                            }
                        <br/>
                        {result === "Red" || result === "Green" ? <img src='https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/animated-noto-color-emoji/344/partying-face_1f973.gif'height="100px" width= "100px" /> : ""}
                        <br/>
                        <br/>
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <div><Button variant="contained" sx={{ width: '26ch',height:'6ch' }} onClick = {()=> handleBack()} >Another Prediction</Button></div>
                        </div>
                    </div>}
                </Container>
            </Paper>
        </>
    )
}

export default Home
