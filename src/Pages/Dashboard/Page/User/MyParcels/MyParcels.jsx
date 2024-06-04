import useMyParcels from "@/Hooks/useMyParcels";
import { Link } from "react-router-dom";


const MyParcels = () => {
    const [parcels] = useMyParcels();
    
    console.log(parcels);
    return (
        <section className="container mx-auto ">
            <div className="text-center mb-12">
                <h2 className="text-5xl eb-serif text-green-500 font-bold">My Parcels</h2>
                <p className="text-gray-600 mt-4">Here you can view and manage your booked parcels</p>
                <p className='border-b-2 border-[#4acf3d] w-60 mt-3 mb-8 mx-auto'>----------------</p>
            </div>
            <div className="overflow-x-auto">
                <table className="lg:min-w-full bg-white rounded-lg shadow-md">
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
                            parcels.map(parcel => <tr key={parcel._id}>
                                <td className="border-t py-4 px-4">{parcel.parcelType}</td>
                                <td className="border-t py-4 px-4">{parcel.deliveryDate}</td>
                                <td className="border-t py-4 px-4">2023-06-07</td>
                                <td className="border-t py-4 px-4">{parcel.bookingDate}</td>
                                <td className="border-t py-4 px-4">12345</td>
                                <td className="border-t py-4 px-4">{parcel.status}</td>
                                <td className="border-t flex lg:flex-row flex-col gap-4 items-center py-4  px-4">

                                    <Link to={`/dashboard/updateBooking/${parcel._id}`}><button disabled = {parcel.status !== 'pending'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" >Update</button></Link>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" >Cancel</button>
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Review</button>
                                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">Pay</button>
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