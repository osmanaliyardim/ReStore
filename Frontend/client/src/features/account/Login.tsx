import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Divider, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {register, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm({
    mode: "onTouched"
  });

  const submitForm = async (data: FieldValues) => {
    await dispatch(signInUser(data));
    navigate('/catalog');
  }

  return (
      <Container component={Paper} maxWidth="sm" sx={{display: "flex", flexDirection: "column", alignItems: "center", p: 4}}>
          <Avatar sx={{ m: 1, bgcolor: 'green' }}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              autoFocus
              {...register('username', {required: "*Username is required"})}
              error={!!errors.username}
              helperText={errors?.username?.message as string}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              {...register('password', {required: "*Password is required"})}
              error={!!errors.password}
              helperText={errors?.password?.message as string}
            />
            <LoadingButton
              loading={isSubmitting}
              disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 4, height: 50 }}
            >
              Sign In
            </LoadingButton>
            <Grid container sx={{ mb: 4 }}>
              <Grid item>
              Don't have an account? &nbsp;
                <Link to='/register'>
                  {"Sign Up"}
                </Link>
              </Grid>
            </Grid>

            <Divider sx={{ mb: 4 }}/>

            <Grid container>
              <Grid item>
                <Typography variant="h3" color="red">
                  DEMO USERS
                </Typography>
                <Typography variant="h4">
                  demomember - Pass@w0rd
                  demoadmin - Pass@w0rd
                </Typography>
              </Grid>
            </Grid>
          </Box>
      </Container>
  );
}

export default Login;