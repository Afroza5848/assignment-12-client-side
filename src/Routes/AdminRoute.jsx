
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import useRole from '@/Hooks/useRole'
const AdminRoute = ({ children }) => {
    const [role, isLoading] = useRole()

    if (isLoading) return <progress className="progress w-56"></progress>
    if (role === 'admin') return children
    return <Navigate to='/dashboard' />
}

export default AdminRoute

AdminRoute.propTypes = {
    children: PropTypes.element,
}