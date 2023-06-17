import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
const theme = createTheme();
export default function SignIn() {
  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('token')){
      // navigate('/home')
    }
  },[])
  const handleSubmit = (event) => {
    event.preventDefault();
    const host = 'http://localhost:5001'
    const data = new FormData(event.currentTarget);
    const obj = {
      email: data.get('email'),
      password: data.get('password'),
      user: data.get('username')
    };
    axios.post(`${host}/users/add`,obj)
      .then((res)=>{
        console.log('res',res)
        localStorage.setItem('token',res.data.token)
        console.log('res.data = ',res.data.newUser._id)
        localStorage.setItem('id',res.data.newUser._id)
        localStorage.setItem('user',res.data.newUser.user)
        console.log('token',localStorage.getItem('token'))
        // navigate('/bank-info');
        navigate('/home')
      })
      .catch((res)=>{
        console.log(`user post error `,res)
        console.log('data before error',obj)
      })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email AddressFu"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  {"Already Registered? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}