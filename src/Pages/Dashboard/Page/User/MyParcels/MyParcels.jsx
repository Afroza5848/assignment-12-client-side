import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useMyParcels from "@/Hooks/useMyParcels";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";



const MyParcels = () => {
    const [rating, setRating] = useState(1);
    const [feedback, setFeedback] = useState('');
    const [parcels, , refetch] = useMyParcels();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [MyParcels, setMyParcel] = useState([])
    const [statusFilter, setStatusFilter] = useState([])
    const [parcel, setParcel] = useState({});

    const handleReview = item => {
        document.getElementById('my_modal_3').showModal();
        setParcel(item)
    }

    console.log(parcels);
    // cancel booking parcel--------------------
    const handleUpdateStatus = async (parcel) => {
        if (parcel.status !== 'pending') {
            return toast.error(`Your Parcels already ${parcel.status}.`)
        }
        const status = parcel.status
        const result = await axiosSecure.patch(`/parcels/${parcel._id}`, { status })
        if (result.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${parcel.name}, Your parcel Canceled.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    // submit review-------------------------
    
    const handleSubmitReview = async () => {
        const review = {
            name: user?.displayName,
            image: user?.photoURL,
            rating: parseInt(rating),
            feedback: feedback,
            deliverymenId: parcel.deliverymenId,
            reviewGivingDate: new Date()
        }
        const result = await axiosSecure.post('/review', review)
        console.log(result);
        if (result.data.insertedId) {
            const res = await axiosSecure.put(`/average-review/${parcel?.deliverymenId}`, { rating: parseInt(rating) })
            console.log('hellowe', res.data);
            toast.success('Review submit successfully')
        }

    }
    console.log(parcel);
    // fillter by status------------------
    const handleFilter = filter => {

        if (filter === 'all') {
            setStatusFilter(parcels)
        }
        if (filter === 'pending') {
            const pending = MyParcels.filter(parcel => parcel.status === 'pending')
            setStatusFilter(pending)
        }
        if (filter === 'On The Way') {
            const pending = MyParcels.filter(parcel => parcel.status === 'On The Way')
            setStatusFilter(pending)
        }
        if (filter === 'Delivered') {
            const pending = MyParcels.filter(parcel => parcel.status === 'Delivered')
            setStatusFilter(pending)
        }
        if (filter === 'Canceled') {
            const pending = MyParcels.filter(parcel => parcel.status === 'Canceled')
            setStatusFilter(pending)
        }

    }
    console.log(statusFilter);
    useEffect(() => {
        setMyParcel(parcels)
        setStatusFilter(parcels)
    }, [parcels])
    return (
        <section className="container mx-auto ">

            <div className="text-center mb-12">
                <h2 className="text-5xl eb-serif text-green-500 font-bold">My Parcels</h2>
                <p className="text-gray-600 mt-4">Here you can view and manage your booked parcels</p>
                <p className='border-b-2 border-[#4acf3d] w-60 mt-3 mb-8 mx-auto'>----------------</p>
            </div>


            <details className="dropdown my-5 w-64 mx-auto">
                <summary className="m-1 btn login text-white text-xl">Filter By Different Status</summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li onClick={() => handleFilter("all")}><a>All</a></li>
                    <li onClick={() => handleFilter("pending")}><a>Pending</a></li>
                    <li onClick={() => handleFilter("On The Way")}><a>On The Way</a></li>
                    <li onClick={() => handleFilter("Delivered")}><a>Delivered</a></li>
                    <li onClick={() => handleFilter("Canceled")}><a>Canceled</a></li>
                </ul>
            </details>

            <div className="overflow-x-auto w-full">
                <table className="lg:w-full bg-white rounded-lg shadow-md">
                    <thead className="login text-white">
                        <tr className="">
                            <th className="py-5 px-4 ">Parcel Type</th>
                            <th className="py-5 px-4 ">Requested Delivery Date</th>
                            <th className="py-5 px-4 ">Approximate Delivery Date</th>
                            <th className="py-5 px-4 ">Booking Date</th>
                            <th className="py-5 px-4 ">Delivery Men ID</th>
                            <th className="py-5 px-4 ">Status</th>
                            <th className="py-5 px-4 ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            statusFilter.map(parcel => <tr key={parcel._id}>
                                <td className="border-t text-center py-4 px-4">{parcel.parcelType}</td>
                                <td className="border-t text-center py-4 px-4">{parcel.deliveryDate}</td>
                                <td className="border-t text-center py-4 px-4">{parcel.approximateDeliveryDate}</td>
                                <td className="border-t text-center py-4 px-4">{parcel.bookingDate}</td>
                                <td className="border-t text-center py-4 px-4">{parcel.deliverymenId}</td>
                                <td className="border-t text-center py-4 px-4">{parcel.status}</td>
                                <td className="border-t text-center flex lg:flex-row flex-col gap-4 items-center py-4  px-4">

                                    <Link to={`/dashboard/updateBooking/${parcel._id}`}><button disabled={parcel.status !== 'pending'} className={`bg-blue-500 ${parcel.status !== 'pending' && 'cursor-not-allowed'} hover:bg-blue-700 disabled:opacity-10 text-white font-bold py-1 px-2 rounded`} >Update</button></Link>
                                    <button onClick={() => handleUpdateStatus(parcel)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" >Cancel</button>

                                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                    <button onClick={() => handleReview(parcel)} className={`${parcel.status === 'Delivered' ? 'block' : 'hidden'} bg-green-500 hover:bg-green-700  text-white font-bold py-1 px-2 rounded`} >Review</button>
                                    <dialog id="my_modal_3" className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-error absolute right-2 top-2">✕</button>
                                            </form>

                                            <h2 className="text-3xl text-green-500 eb-serif font-bold mb-2">Give Review</h2>
                                            <p className='border-b-2 border-[#4acf3d] w-60 mt-3 mb-8 mx-auto'>----------------</p>
                                            <div >
                                                <div className="mb-4">
                                                    <label className="block mb-2">Users Name</label>
                                                    <input
                                                        type="text"
                                                        value={user?.displayName}
                                                        className="w-full p-2 border border-gray-300 rounded"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block mb-2">Users Image</label>
                                                    <img
                                                        src={user?.photoURL}
                                                        alt="User"
                                                        className="w-24 h-24 object-cover rounded"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className=" mb-2">Rating (out of 5)</label>
                                                    <input
                                                        id="rating"
                                                        type="number"
                                                        value={rating}
                                                        onChange={(e) => setRating(Math.max(1, Math.min(5, parseInt(e.target.value))))}
                                                        min={1}
                                                        max={5}
                                                        required
                                                        className="mt-1 border v p-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="mb-2">Feedback</label>
                                                    <textarea name="feedback"

                                                        onChange={(e) => setFeedback(e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded"
                                                        required
                                                    ></textarea>

                                                </div>
                                                {/* <input type="hidden" value='' /> */}
                                                <button
                                                    onClick={handleSubmitReview}
                                                    type="submit"
                                                    className="login text-white px-4 py-2 rounded"
                                                >
                                                    Submit Review
                                                </button>
                                            </div>
                                        </div>
                                    </dialog>

                                    <Link to="/dashboard/checkOut"><button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">Pay</button></Link>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default MyParcels;