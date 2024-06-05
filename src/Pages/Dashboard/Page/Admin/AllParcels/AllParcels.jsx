import useAllDeliverymen from "@/Hooks/useAllDeliverymen";
import useAllParcels from "@/Hooks/useAllParcels";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useState } from "react";



const AllParcels = () => {
    const axiosSecure = useAxiosSecure()
    const [parcels] = useAllParcels();
    //console.log(parcels);
    const [deliveryMens] = useAllDeliverymen();
    //console.log('deliverymen',deliveryMens);
    const [selectedDeliveryMenId, setSelectedDeliveryMenId] = useState('');
    const [approximateDeliveryDate, setApproximateDeliveryDate] = useState('');
    console.log(selectedDeliveryMenId,approximateDeliveryDate);
    // handle assign button
    const handleAssign = async(item) => {
        const assignParcel = {
            deliverymenId: selectedDeliveryMenId,
            approximateDeliveryDate: approximateDeliveryDate,
            status:item.status
        }
        const result = axiosSecure.patch(`/assignParcels/${item._id}`, assignParcel )
        console.log('assign', result.data);

    }

    return (
        <section className="container mx-auto ">
            <div className="text-center mb-12">
                <h2 className="text-5xl eb-serif text-green-500 font-bold">All  Parcels</h2>
                <p className="text-gray-600 mt-4">Here you can view and manage All Booked parcels</p>
                <p className='border-b-2 border-[#4acf3d] w-60 mt-3 mb-8 mx-auto'>----------------</p>
            </div>
            <div className="overflow-x-auto">
                <table className="lg:min-w-full bg-white rounded-lg shadow-md">
                    <thead className="login text-white">
                        <tr className="">
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
                            parcels.map(parcel => <tr key={parcel._id}>
                                <td className="border-t text-center capitalize py-4 px-4">{parcel.name}</td>
                                <td className="border-t text-center py-4 px-4">{parcel.phone}</td>
                                <td className="border-t text-center py-4 px-4">{parcel.deliveryDate}</td>
                                <td className="border-t text-center py-4 px-4">{parcel.bookingDate}</td>
                                <td className="border-t text-center py-4 px-4">{parcel.parcelPrice}</td>
                                <td className="border-t text-center py-4 px-4">{parcel.status}</td>
                                <td className="border-t justify-center flex lg:flex-row flex-col gap-4 items-center py-4  px-4">
                                    <button ></button>
                                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded" onClick={() => document.getElementById('my_modal_3').showModal()}>Manage Parcel</button>
                                    <dialog id="my_modal_3" className="modal py-20">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-error absolute right-2 top-2">✕</button>
                                            </form>
                                            <form >
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
                                                <div className="mb-4">
                                                    <input onClick={() =>handleAssign(parcel)} type="submit" className="btn login text-white" value="Assign" />
                                                </div>
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