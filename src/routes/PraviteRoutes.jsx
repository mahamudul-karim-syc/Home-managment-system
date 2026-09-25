import  { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { Navigate } from 'react-router';

const PraviteRoutes = ({children}) => {
    const {authuser,loding}=useContext(AuthContext)
    if(loding){
        return<p>Loading....</p>
    }
    if(!authuser){
        return <Navigate to={'/Login'}></Navigate>
    }
    return  children
    
};

export default PraviteRoutes;