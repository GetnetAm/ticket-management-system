import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const RoleBaseRoutes = ({ children, requiredRole }) => {
    const { user, loading } = useAuth();

    // Show loading state while the user data is being loaded
    if (loading) {
        return <div>Loading......</div>;
    }

    // If the user is not logged in
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Check if the user's role matches the required role(s)
    if (!requiredRole.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    // Render the children if all conditions are met
    return children;
};

// PropTypes validation
RoleBaseRoutes.propTypes = {
    children: PropTypes.node.isRequired, // React children to render
    requiredRole: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of allowed roles
};

export default RoleBaseRoutes;
