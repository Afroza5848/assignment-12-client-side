import useAllUsers from "@/Hooks/useAllUsers";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


const AllUsers = () => {
    const [allUsers] = useAllUsers();
    console.log(allUsers);
    const axiosSecure = useAxiosSecure();
    // make  delivery men
    const makeDeliverymen = async(user) => {
        if(user?.role === 'deliverymen' || user?.role === 'admin'){
            return toast.error(`${user?.name} already ${user?.role} now!`)
        }
        const result = await axiosSecure.patch(`/makeDeliverymen/${user._id}`)
        console.log('make deliver',result.data);
        if(result.data.modifiedCount > 0){
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
    const handleMakeAdmin = async(user) => {
        if(user?.role === 'admin'){
            return toast.error(`${user?.name} already ${user?.role} now!`)
        }
        const result = await axiosSecure.patch(`/makeAdmin/${user._id}`)
        console.log('make admin',result.data);
        if(result.data.modifiedCount > 0){
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
                            allUsers.map(user => <tr key={user._id}>
                                <td className="border-t py-3 text-center px-4">{user.name}</td>
                                <td className="border-t py-3 text-center px-4">{user.phone? user.phone : 'Phone Number not found!'}</td>
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
        </section>
    );
};

export default AllUsers;