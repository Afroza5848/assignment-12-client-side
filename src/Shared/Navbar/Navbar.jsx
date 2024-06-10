import 'daisyui/dist/full.css';
import logo from '../../assets/image/logo.png'
import { Link, NavLink } from 'react-router-dom';
import notification from '../../assets/image/bell.png'
import useAuth from '@/Hooks/useAuth';
import toast from 'react-hot-toast';


const Navbar = () => {
    const { user,logOut } = useAuth();
    const handleLogout = () => {
        logOut()
        .then(() => {
            toast.success('Logout Success')
        })
    }
    const navLink = <>
        <NavLink className={({ isActive, isPending }) =>
            isActive
                ? "text-green-500 font-medium text-2xl eb-serif border-b-2  border-green-500"
                : isPending
                    ? "text-white font-medium text-2xl eb-serif"
                    : "text-white font-medium text-2xl eb-serif"
        } to="/"><a>Home</a></NavLink>
        <NavLink className={({ isActive, isPending }) =>
            isActive
                ? "text-green-500 font-medium text-2xl eb-serif border-b-2  border-green-500"
                : isPending
                    ? "text-gray-800 font-medium text-2xl eb-serif"
                    : "text-gray-800 font-medium text-2xl eb-serif"
        } to="/dashboard"><a>Dashboard</a></NavLink>
        <NavLink className={({ isActive, isPending }) =>
            isActive
                ? "text-green-500 font-medium text-2xl eb-serif border-b-2  border-green-500"
                : isPending
                    ? "text-gray-800 font-medium text-2xl eb-serif"
                    : "text-gray-800 font-medium text-2xl eb-serif"
        } to="/notification"><a><img className='w-7' src={notification} alt="" /></a></NavLink>
    </>
    return (

        <div className='bg-base-200 py-4'>
            <div className="navbar max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost hidden bar">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-5">
                            {navLink}
                        </ul>
                    </div>
                    <div className='flex items-center gap-3'>
                        <img className='lg:w-14 w-10' src={logo} alt="" />
                        <a className=" lg:text-5xl text-3xl font-bold monts">Parcel<span className='text-[#4acf3d] font-extrabold lg:text-6xl text-3xl eb-serif'>Pro</span></a>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-5">
                        {navLink}
                    </ul>
                </div>
                <div className="navbar-end space-x-3">

                    {
                        user ? <>
                            <details className="dropdown z-[200]">
                                <summary className="m-3 btn login  rounded-full">
                                    <div className="avatar">
                                        <div className="w-12 border-2 border-white m-3 rounded-full">
                                            <img src={user?.photoURL} />
                                        </div>
                                    </div>
                                </summary>
                                <ul className="p-4 shadow-lg menu dropdown-content z-[1] bg-base-100 rounded-lg space-y-4 w-52">
                                    <li><a className='capitalize font-bold text-2xl text-green-500'>{user?.displayName}</a></li>
                                    <NavLink className={({ isActive, isPending }) =>
                                        isActive
                                            ? "text-green-500 font-medium text-2xl eb-serif border-b-2  border-green-500"
                                            : isPending
                                                ? "text-gray-800 font-medium text-2xl eb-serif"
                                                : "text-gray-800 font-medium text-2xl eb-serif"
                                    } to="/dashboard"><a>Dashboard</a></NavLink>
                                    <li><button onClick={handleLogout} className="px-3 py-2 text-center rounded-md bg-[#4acf3d] text-white text-xl eb-serif font-semibold">Logout</button></li>
                                </ul>
                            </details>
                        </> :
                            <>
                                <Link to="/login"><button className="px-5 py-3 rounded-md bg-[#4acf3d] text-white text-xl eb-serif font-semibold">Login</button></Link>
                            </>
                    }




                </div>
            </div>
        </div>
    );
};

export default Navbar;
