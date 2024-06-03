import useAuth from "@/Hooks/useAuth";
import useRole from "@/Hooks/useRole";


const Profile = () => {
    const { user } = useAuth();
    const [role] = useRole()
    return (
        <div className='flex justify-center items-center h-screen'>

            <div className='bg-white shadow-lg rounded-2xl lg:w-1/2 pb-10'>
                <img
                    alt='profile'
                    src='https://i.ibb.co/f4KSx8x/7615161.jpg'
                    className='w-full mb-4 rounded-t-lg h-36'
                />
                <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                    <a href='#' className='relative block'>
                        <img
                            alt='profile'
                            src={user?.photoURL}
                            className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                        />
                    </a>

                    <p className='py-2 px-4 text-xl uppercase text-white bg-[#35da3d] rounded'>
                        {role}
                    </p>
                    <p className='mt-2 text-xl font-medium text-gray-800 '>
                        User Id: {user?.uid}
                    </p>
                    <div className='w-full p-2 mt-4 rounded-lg'>
                        <div className='flex gap-4 flex-wrap items-center justify-between text-sm text-gray-600 '>
                            <p className='flex flex-col'>
                                Name
                                <span className='font-bold text-black '>
                                    {user?.displayName}
                                </span>
                            </p>
                            <p className='flex flex-col'>
                                Email
                                <span className='font-bold text-black '>{user?.email}</span>
                            </p>

                            <div>
                                <fieldset className="w-full space-y-1 dark:text-gray-800">
                                    <label htmlFor="files" className="block text-sm font-medium">Attachments</label>
                                    <div className="flex">
                                        <input type="file" name="files" id="files" className="px-4 py-6 mb-5 border-2 border-dashed rounded-md dark:border-gray-300 dark:text-gray-600 dark:bg-gray-100" />
                                    </div>
                                </fieldset>
                                <button className='bg-[#35da3d] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#349739] block mb-1'>
                                    Update Profile Image
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;