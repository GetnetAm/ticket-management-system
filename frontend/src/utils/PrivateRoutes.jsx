import { Navigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import PropTypes from "prop-types";

const PrivateRoutes= ({children})=>{
    const {user, loading}= useAuth()

    if(loading){
        return <div>Loading........</div>
    }

    return user ? children: <Navigate to="/login" />
}



PrivateRoutes.propTypes = {
    children: PropTypes.node.isRequired, // Ensures children is passed and is a valid React node
};

export default PrivateRoutes