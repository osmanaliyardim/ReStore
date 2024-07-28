import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const {register, handleSubmit, setError, formState: {isSubmitting, errors, isValid}} = useForm({
    mode: "onTouched"
  });

  const handleApiErrors = (errors: any) => {
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes('Password')){
          setError('password', {message: error})
        }
        else if (error.includes('Username')){
          setError('username', {message: error})
        }
        else if (error.includes('Email')){
          setError('email', {message: error})
        }
      });
    }
    console.error(errors);
  }

  return (
      <Container component={Paper} maxWidth="sm" sx={{display: "flex", flexDirection: "column", alignItems: "center", p: 4}}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.dark' }}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" 
            onSubmit={handleSubmit(data => agent.Account.register(data)
              .then(() => 
                { 
                  toast.success("Registration successfull!");
                  navigate('/login');
                })
              .catch(error => handleApiErrors(error)))} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              autoFocus
              {...register('username',
                {
                  required: "*Username is required",
                  pattern: 
                  { 
                    value: /^([a-zA-Z])[a-zA-Z_-]*[\w_-]*[\S]{3,15}$|^([a-zA-Z])[0-9_-]*[\S]{3,15}$|^[a-zA-Z]*[\S]{3,15}$/, 
                    message: "Not a valid username (minimum 3 chars)"
                  }
                })
              }
              error={!!errors.username}
              helperText={errors?.username?.message as string}
            />
                        <TextField
              margin="normal"
              fullWidth
              label="Email"
              {...register('email', 
                {
                  required: "*Email is required", 
                  pattern: {value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/, message: "Not a valid email address"}
                })
              }
              error={!!errors.email}
              helperText={errors?.email?.message as string}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              {...register('password',
                {
                  required: "*Password is required",
                  pattern: 
                  {
                    value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/, 
                    message: "Not a strong or valid password"
                  }
                })
              }
              error={!!errors.password}
              helperText={errors?.password?.message as string}
            />
            <LoadingButton
              loading={isSubmitting}
              disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 4, height: 50, bgcolor: "#f44336", '&:hover': {bgcolor:"#ba000d"} }}
            >
              Register
            </LoadingButton>
            <Grid container sx={{ mb: 4 }}>
              <Grid item>
              Already have an account? &nbsp;
                <Link to='/login'>
                  {"Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
  );
}

export default Register;