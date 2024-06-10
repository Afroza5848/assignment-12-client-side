
import useRole from '@/Hooks/useRole';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const DeliverymenRoute = ({ children }) => {
    const [role, isLoading] = useRole()

    if (isLoading) return <progress className="progress w-56"></progress>
    if (role === 'deliverymen') return children
    return <Navigate to='/dashboard' />
};

DeliverymenRoute.propTypes = {
    children: PropTypes.element,
};

export default DeliverymenRoute;