import { Link, useNavigate } from "react-router-dom"
import signIn from '../../assets/image/signIn.png'
import registration from '../../assets/image/registration-form.png'
import { useForm } from "react-hook-form"
import axios from "axios"
import useAuth from "@/Hooks/useAuth"
import toast from "react-hot-toast"
import { ImSpinner9 } from "react-icons/im";
import useAxiosPublic from "@/Hooks/useAxiosPublic"




const Registration = () => {
    const { createUser, updateUserProfile, loading, setLoading, googleSignIn } = useAuth();
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const axiosPublic = useAxiosPublic();
    const onSubmit = async (data) => {
        console.log(data.email, data.password, data.name, data.role);
        console.log(data.photo[0]);
        const formData = new FormData();
        formData.append('image', data.photo[0])
        // createUser(data.email, data.password)
        try {
            setLoading(true)
            // image upload get url
            const image = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_UPDATE_IMG_API_KEY}`,
                formData
            )
            console.log(image);
            //2. User Registration
            const result = await createUser(data.email, data.password)
            console.log(result);

            // update profile
            await updateUserProfile(data.name, image.data.data.display_url)
            const userInfo = {
                name: data.name,
                email: data.email,
                image: image.data.data.display_url,
                role: data.role,
                phone: data.phone
            }
            const res = await axiosPublic.post('/users', userInfo)
            if (res.data.insertedId) {
                toast.success('Registration Successfully')
                navigate('/login')
            }


        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    // handle google sign in
    const handleGoogleSignIn = async () => {
        try {
            const res = await googleSignIn()
            const userInfo = {
                name: res.user.displayName,
                email: res.user.email,
                image: res.user.photoURL,
                role: 'user'
            }
            const result = await axiosPublic.post('/users', userInfo)
            console.log(result);
            toast.success('Registration Successfully')
            navigate('/')

        } catch (err) {
            console.log(err)
            toast.error(err.message)
        }
    }


    return (
        <div className='flex justify-center w-full items-center mt-20 min-h-[calc(100vh-306px)]'>
            <div className='flex lg:w-[55%] lg:flex-row flex-col mx-auto overflow-hidden bg-white rounded-lg shadow-lg  '>
                <div className='w-full px-6 py-8 md:px-8 lg:w-1/2'>
                    <div className='flex justify-center mx-auto'>
                        <img
                            src={registration}
                            alt=''
                        />
                    </div>

                    <p className='mt-3 text-xl text-center text-gray-600 '>
                        Get Your Free Account Now.
                    </p>

                    <div onClick={handleGoogleSignIn} disabled={loading} className='flex disabled:cursor-not-allowed cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg   hover:bg-gray-50 '>
                        <div className='px-4 py-2'>
                            <svg className='w-6 h-6' viewBox='0 0 40 40'>
                                <path
                                    d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                                    fill='#FFC107'
                                />
                                <path
                                    d='M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z'
                                    fill='#FF3D00'
                                />
                                <path
                                    d='M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z'
                                    fill='#4CAF50'
                                />
                                <path
                                    d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                                    fill='#1976D2'
                                />
                            </svg>
                        </div>

                        <span className='w-5/6 px-4 py-3 font-bold text-center'>
                            Sign in with Google
                        </span>
                    </div>


                    <div className='flex items-center justify-between mt-4'>
                        <span className='w-1/5 border-b  lg:w-1/4'></span>

                        <div className='text-xs text-center text-gray-500 uppercase  hover:underline'>
                            or Registration with email
                        </div>

                        <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mt-4'>
                            <label
                                className='block mb-2 text-sm font-medium text-gray-600 '
                                htmlFor='name'
                            >
                                Username
                            </label>
                            <input
                                id='name'
                                autoComplete='name'
                                name='name'
                                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type='text' {...register("name", { required: true })}
                            />
                            {errors.name && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className='mt-4'>
                            <label
                                className='block mb-2 text-sm font-medium text-gray-600 '
                                htmlFor='photo'
                            >
                                Select Image
                            </label>
                            <input type="file" name="photo" className="file-input file-input-bordered w-full "
                                {...register("photo", { required: true })}
                            />
                            {errors.photo && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className='mt-4'>
                            <label
                                className='block mb-2 text-sm font-medium text-gray-600 '
                                htmlFor='photo'
                            >
                                Select Type
                            </label>
                            <select name="role" className="select select-bordered w-full" {...register("role", { required: true })}>
                                <option disabled selected>Select Your Type</option>
                                <option value="user">User</option>
                                <option value="deliverymen">Delivery Men</option>
                            </select>
                            {errors.role && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className='mt-4'>
                            <label
                                className='block mb-2 text-sm font-medium text-gray-600 '
                                htmlFor='LoggingEmailAddress'
                            >
                                Phone Number
                            </label>
                            <input
                                id='LoggingEmailAddress'
                                autoComplete='phone'
                                name='phone'
                                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type='number' {...register("phone", { required: true })}
                            />
                            {errors.phone && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className='mt-4'>
                            <label
                                className='block mb-2 text-sm font-medium text-gray-600 '
                                htmlFor='LoggingEmailAddress'
                            >
                                Email Address
                            </label>
                            <input
                                id='LoggingEmailAddress'
                                autoComplete='email'
                                name='email'
                                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type='email' {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>

                        <div className='mt-4'>
                            <div className='flex justify-between'>
                                <label
                                    className='block mb-2 text-sm font-medium text-gray-600 '
                                    htmlFor='loggingPassword'
                                >
                                    Password
                                </label>
                            </div>

                            <input
                                id='loggingPassword'
                                autoComplete='current-password'
                                name='password'
                                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type='password' {...register("password", { required: true, minLength: 6, maxLength: 20 })}
                            />
                            {errors.password?.type === 'password' && <span className="text-red-500">password is required</span>}
                            {errors.password?.type === 'minLength' && <span className="text-red-500">password must be 6 characters</span>}
                        </div>
                        <div className='mt-6'>
                            <button
                                type='submit'
                                disabled={loading}
                                className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 login rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
                            >
                                {loading ? <ImSpinner9 className="animate-spin m-auto" /> : 'Sign Up'}
                            </button>
                        </div>
                    </form>

                    <div className='flex items-center justify-between mt-4'>
                        <span className='w-1/5 border-b  md:w-1/4'></span>

                        <Link
                            to='/login'
                            className='text-xs text-gray-500 uppercase hover:text-green-500  hover:underline'
                        >
                            or sign in
                        </Link>

                        <span className='w-1/5 border-b  md:w-1/4'></span>
                    </div>
                </div>
                <div
                    className='bg-cover bg-center lg:w-1/2'
                    style={{
                        backgroundImage: `url(${signIn})`,
                    }}
                ></div>
            </div>
        </div>
    )
}

export default Registration