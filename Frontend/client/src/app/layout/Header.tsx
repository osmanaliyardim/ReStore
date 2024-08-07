import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Avatar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import Constants from "../constants/Constants";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";

const midLinks = [
  {title: 'catalog', path: '/' + Constants.CATALOGS_ENDPOINT},
  {title: 'about', path: '/' + Constants.ABOUT_ENDPOINT},
  {title: 'contact', path: '/' + Constants.CONTACT_ENDPOINT},
]

const rightLinks = [
  {title: 'login', path: '/'+ Constants.LOGIN_ENDPOINT},
  {title: 'register', path: '/'+ Constants.REGISTER_ENDPOINT}
]

const navStyles = {
  color:"inherit",
  textDecoration:"none", 
  typography: "h6", 
  '&:hover': {color:"secondary.main"}, 
  '&.active': {color:"grey.500"}
}

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const Header = ({darkMode, handleThemeChange}: Props) => {
  const {basket} = useAppSelector(state => state.basket);
  const {user} = useAppSelector(state => state.account);
  const itemCount = basket?.items.reduce((sum: any, item: any) => sum + item.quantity, 0);

  return (
    <AppBar position="static">
      <Toolbar sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        
        <Box display="flex" alignItems="center">
          <Avatar alt="Re-Store Logo" src="/images/logo.png" component={NavLink} to="/" sx={{navStyles, width: 200, height: 64}} />

          <Switch checked={darkMode} onChange={handleThemeChange}/>
        </Box>

        <List sx={{display: "flex"}}>
          {midLinks.map(({title, path}) =>(
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
          {user && user.roles?.includes('Admin') &&
            <ListItem component={NavLink} to={'/inventory'} sx={navStyles}>
              INVENTORY
            </ListItem>
          }
        </List>

        <Box display="flex" alignItems="center">
          <IconButton component={Link} to='/Basket' size="large" edge="start" color="inherit" sx={{mr: 2}}>
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart/>
            </Badge>
          </IconButton>

          {user ? <SignedInMenu/> 
                : <List sx={{display: "flex"}}>
                  {rightLinks.map(({title, path}) =>(
                    <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                      {title.toUpperCase()}
                    </ListItem>
                  ))}
          </List>}
          
          
        </Box>

      </Toolbar>
    </AppBar>
  )
};

export default Header;
