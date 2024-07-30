import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";
import Header from "./Header";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "./Loading";
import Constants from "../constants/Constants";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync} from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import HomePage from "../../features/home/HomePage";

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      }
    }
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  }

  if (loading) return <Loading message={Constants.PROJECT_LOADING}/>

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline/>
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      {
        loading ? <Loading message='Initialising app...' />
          : location.pathname === '/' ? <HomePage />
          : <Container sx={{mt: 4}}>
              <Outlet />
            </Container>
      }
    </ThemeProvider>
  )
}

export default App
