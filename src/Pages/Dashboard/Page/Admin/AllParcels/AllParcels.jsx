import useAllDeliverymen from "@/Hooks/useAllDeliverymen";
import useAllParcels from "@/Hooks/useAllParcels";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";




const AllParcels = () => {
    const axiosSecure = useAxiosSecure()
    const [parcels,isLoading , refetch] = useAllParcels();
    const [allParcel,setAllParcel] = useState([])
    
    //console.log(parcels);
    const [deliveryMens] = useAllDeliverymen();
    const [selectedDeliveryMenId, setSelectedDeliveryMenId] = useState('');
    const [approximateDeliveryDate, setApproximateDeliveryDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [id,setId] = useState('');
    
    // handle assign button
    const handleAssign = (id) => {
        document.getElementById('my_modal_3').showModal();
        setId(id)
    }
    const handleSubmit = async() => {
        const assignParcel = {
            deliverymenId: selectedDeliveryMenId,
            approximateDeliveryDate: approximateDeliveryDate,
        }
        console.log(approximateDeliveryDate, selectedDeliveryMenId);
        const result = await axiosSecure.patch(`/assignParcels/${id}`, assignParcel)
        console.log(result.data);

        if (result.data.modifiedCount > 0) {
            refetch();
            toast.success('success')
        }
    }
    console.log(allParcel);
    // handle search by date------------
    const handleSearch = async () => {
        const result = await axiosSecure.get(`/allParcels?startDate=${startDate}&endDate=${endDate}`)
        console.log(result.data);
        setAllParcel(result.data)
    }
    useEffect(() => {
        setAllParcel(parcels)
    },[parcels])
    if(isLoading){
        return <p>loading..............</p>
    }
    return (
        <section className="container mx-auto ">
            <div className="text-center mb-12">
                <h2 className="text-5xl eb-serif text-green-500 font-bold">All  Parcels</h2>
                <p className="text-gray-600 mt-4">Here you can view and manage All Booked parcels</p>
                <p className='border-b-2 border-[#4acf3d] w-60 mt-3 mb-8 mx-auto'>----------------</p>
            </div>
            <div className="mb-6 flex justify-center">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mr-2 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mr-2 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Search
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="lg:min-w-full bg-white rounded-lg shadow-md">
                    <thead className="login text-white">
                        <tr className="login">
                            <th className="py-5 px-4 ">User Name</th>
                            <th className="py-5 px-4 ">User Phone</th>
                            <th className="py-5 px-4 ">Requested Delivery Date</th>
                            <th className="py-5 px-4 ">Booking Date</th>
                            <th className="py-5 px-4 ">Cost</th>
                            <th className="py-5 px-4 ">Status</th>
                            <th className="py-5 px-4 ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allParcel.map(parcel => <tr key={parcel._id}>
                                <td className="border-t text-center capitalize py-4 px-4">{parcel.name}</td>
                                <td className="border-t text-center py-4 px-4">{parcel.phone}</td>
                                <td className="border-t text-center py-4 px-4">{parcel.deliveryDate}</td>
                                <td className="border-t text-center py-4 px-4">{parcel.bookingDate}</td>
                                <td className="border-t text-center py-4 px-4">{parcel.parcelPrice}</td>
                                <td className="border-t text-center py-4 px-4">{parcel.status}</td>
                                <td className="border-t justify-center flex lg:flex-row flex-col gap-4 items-center py-4  px-4">
                                    <button ></button>
                                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                    <button onClick={() => handleAssign(parcel._id)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded" >Manage Parcel</button>
                                    <dialog id="my_modal_3" className="modal py-20">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-error absolute right-2 top-2">✕</button>
                                            </form>
                                            <form>
                                                <div className='mt-4'>
                                                    <label
                                                        className='block mb-2 text-sm font-medium text-gray-600 '
                                                        htmlFor='photo'
                                                    >
                                                        Select Delivery Man
                                                    </label>
                                                    <select name="deliverymenId" className="select select-bordered w-full"
                                                        onChange={(e) => setSelectedDeliveryMenId(e.target.value)}
                                                    >
                                                        {
                                                            deliveryMens.map(men => <option className="text-gray-800" key={men._id} value={men._id}>{men.name}</option>)
                                                        }
                                                    </select>

                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="deliveryDate" className="block text-gray-700 font-bold mb-2">Approximate Delivery Date</label>

                                                    <input type="date" id="deliveryDate" name="approximateDeliveryDate" className="w-full border-gray-200 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                                                        onChange={(e) => setApproximateDeliveryDate(e.target.value)}
                                                    />
                                                </div>
                                                <button onClick={handleSubmit} type="submit" className="btn login text-white mb-4">
                                                    Assign
                                                </button>
                                            </form>
                                        </div>
                                    </dialog>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AllParcels;