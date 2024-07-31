import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import { toast } from "react-toastify";
import Constants from "../constants/Constants";

interface Props {
  roles?: string[];
}

const RequireAuth = ({roles}: Props) => {
  const {user} = useAppSelector(state => state.account);
  const location = useLocation();

  if (!user) {
    return <Navigate to='/login' state={{from: location}}/>
  }

  if (roles && !roles.some(r => user.roles?.includes(r))){
    toast.error(Constants.UNAUTHORIZED_ERROR);
    
    return <Navigate to='/catalog'/>
  }

  return <Outlet/>
}

export default RequireAuth;
