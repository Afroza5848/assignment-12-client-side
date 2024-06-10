import { FaBars } from "react-icons/fa6";
import logo from '../../../../assets/image/logo.png'
import DrawerSide from "./DrawerSide";

const Drawer = () => {
    return (
        <div className="navbar bg-base-200 drawer">
            <div className="flex-1">
            <div className='flex items-center gap-3'>
                        <img className='w-14' src={logo} alt="" />
                        <a className=" text-5xl font-bold monts">Parcel<span className='text-[#4acf3d] font-extrabold text-6xl eb-serif'>Pro</span></a>
                    </div>
            </div>
            <div className="flex-none">
                <div className="drawer">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className="btn login  drawer-button"><FaBars></FaBars></label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            <DrawerSide></DrawerSide>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Drawer;