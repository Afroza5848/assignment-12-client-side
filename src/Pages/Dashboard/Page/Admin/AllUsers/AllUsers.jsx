
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    // pagination ----------------------
    const {count} = useLoaderData()
    const [currentPage, setCurrentPage] = useState(0);
    const itemPerPage = 5;
    const totalNumberOfPages = Math.ceil(count / itemPerPage)
    const pages = [...Array(totalNumberOfPages).keys()]
    console.log(count);
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }
    // data load
    const { data: users = [], } = useQuery({
        queryKey: ['users', currentPage],
        queryFn: async () => {
            const result = await axiosSecure.get(`/allUsers?page=${currentPage}&size=${itemPerPage}`);
            console.log(result.data);
            return result.data
        }
        
    })
    // make  delivery men
    const makeDeliverymen = async (user) => {
        if (user?.role === 'deliverymen' || user?.role === 'admin') {
            return toast.error(`${user?.name} already ${user?.role} now!`)
        }
        const result = await axiosSecure.patch(`/makeDeliverymen/${user._id}`)
        console.log('make deliver', result.data);
        if (result.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} is delivery man from now.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    // make admin
    const handleMakeAdmin = async (user) => {
        if (user?.role === 'admin') {
            return toast.error(`${user?.name} already ${user?.role} now!`)
        }
        const result = await axiosSecure.patch(`/makeAdmin/${user._id}`)
        console.log('make admin', result.data);
        if (result.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} is admin from now.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    return (
        <section className="container mx-auto py-16">
            <div className="text-center mb-12">
                <h2 className="text-5xl eb-serif text-green-500 font-bold">All Users</h2>
                <p className="text-gray-600 mt-4">Here you can view and manage all the registered users</p>
                <p className='border-b-2 border-[#4acf3d] w-60 mt-3 mb-8 mx-auto'>----------------</p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full rounded-lg ">
                    <thead className=" login text-white">
                        <tr className="login">
                            <th className="py-5 px-4 text-center ">Users Name</th>
                            <th className="py-5 px-4 text-center ">Users Phone Number</th>
                            <th className="py-5 px-4 text-center ">Number of Parcels Booked</th>
                            <th className="py-5 px-4 text-center ">Total Spent Amount</th>
                            <th className="py-5 px-4 text-center ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => <tr key={user._id}>
                                <td className="border-t py-3 text-center px-4">{user.name}</td>
                                <td className="border-t py-3 text-center px-4">{user.phone ? user.phone : 'Phone Number not found!'}</td>
                                <td className="border-t py-3 text-center px-4">{user.parcelBooked}</td>
                                <td className="border-t py-3 text-center px-4">{user.totalSpent}</td>
                                <td className="border-t flex justify-center items-center gap-2 py-3 text-center px-4">
                                    <button onClick={() => makeDeliverymen(user)} className="login hover:bg-green-700 text-white font-bold py-1 px-2 rounded " >Make Delivery Men</button>
                                    <button onClick={() => handleMakeAdmin(user)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">Make Admin</button>

                                </td>
                            </tr>)
                        }



                    </tbody>
                </table>
            </div>

            {/* pagination-------------- */}
            <div className="flex justify-center mt-8">
                <button onClick={handlePrevPage} className="flex border items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-green-500 dark:hover:bg-green-500 hover:text-white dark:hover:text-gray-200">
                    previous
                </button>

                {
                    pages.map(page => <button onClick={() => setCurrentPage(page)} key={page} className={`${currentPage === page && 'login'} items-center border hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex dark:bg-gray-800 dark:text-gray-200   `}>
                        {page}
                    </button>)
                }

                <button onClick={handleNextPage} className="flex border items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-green-500 dark:hover:bg-green-500 hover:text-white dark:hover:text-gray-200">
                    Next
                </button>
            </div>
        </section>
    );
};

export default AllUsers;