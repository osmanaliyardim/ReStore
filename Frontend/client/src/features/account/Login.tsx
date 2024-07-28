import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import agent from '../../app/api/agent';

const Login = () => {
  const [values, setValues] = useState({
    userName: '',
    password: ''
  })

  const handleSubmit = (event: any) => {
    event.preventDefault();

    agent.Account.login(values);
  };

  const handleInputChange = (event: any) => {
    const {name, value} = event.target;

    setValues({...values, [name]: value});
  };

  return (
      <Container component={Paper} maxWidth="sm" sx={{display: "flex", flexDirection: "column", alignItems: "center", p: 4}}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              name="username"
              autoFocus
              onChange={handleInputChange}
              value={values.userName}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={handleInputChange}
              value={values.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 4 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
              Don't have an account? &nbsp;
                <Link to='/register'>
                  {"Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
  );
}

export default Login;