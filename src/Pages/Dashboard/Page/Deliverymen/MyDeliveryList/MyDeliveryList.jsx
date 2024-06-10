import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import or create an icon for the marker
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';


const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const MyDeliveryList = () => {
    
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: deliveryList = [], refetch } = useQuery({
        queryKey: ['deliveryList'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myDeliveryList/${user?.email}`)
            return res.data;
        }
    })
    console.log(location);

    // handle deliver-------------------------
    const handleDelivered = (parcel) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be delivered this parcel!",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delivered it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.patch(`/updateDeliver/${parcel._id}`)
                if (res.data.modifiedCount > 0) {
                    const res = await axiosSecure.patch(`/numDelivered/${user?.email}`)
                    console.log(res.data);
                    refetch()
                    Swal.fire({
                        title: "Success",
                        text: "Your Parcels will delivered!",
                        icon: "success"
                    });
                }

            }
        });
    }

    // handle cancel-------------------
    const handleCancel = parcel => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be cancel this parcel!",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.patch(`/cancelParcel/${parcel._id}`)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Success",
                        text: "Your Parcels canceled!",
                        icon: "success"
                    });
                }

            }
        });
    }
    //  location-------------
    const handleLocation = () => {
        document.getElementById('my_modal_3').showModal();
        
    }
    return (
        <section className="container mx-auto ">
            <div className="text-center mb-12">
                <h2 className="text-5xl eb-serif text-green-500 font-bold">My Delivery List</h2>
                <p className="text-gray-600 mt-4">Here you can view and manage your all Delivery parcels.</p>
                <p className='border-b-2 border-[#4acf3d] w-60 mt-3 mb-8 mx-auto'>----------------</p>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="lg:w-full bg-white rounded-lg shadow-md">
                    <thead className="login text-white">
                        <tr className="">
                            <th className="py-5 px-4 ">Booked User Name</th>
                            <th className="py-5 px-4 ">Receivers Name</th>
                            <th className="py-5 px-4 ">Booked Users Phone</th>
                            <th className="py-5 px-4 ">Requested Delivery Date</th>
                            <th className="py-5 px-4 ">Approximate Delivery Date</th>
                            <th className="py-5 px-4 ">Recievers phone number</th>
                            <th className="py-5 px-4 ">Receivers Address</th>
                            <th className="py-5 px-4 ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            deliveryList.map(parcel => <tr key={parcel._id}>
                                <td className="border-t text-center py-4 px-4">{parcel.name}</td>
                                <td className="border-t text-center py-4 px-4">{parcel.receiverName}</td>
                                <td className="border-t text-center py-4 px-4">{parcel.phone}</td>
                                <td className="border-t text-center py-4 px-4">{parcel.deliveryDate}</td>
                                <td className="border-t text-center py-4 px-4">{parcel.approximateDeliveryDate}</td>
                                <td className="border-t text-center py-4 px-4">{parcel?.receiverPhone ? parcel?.receiverPhone : 'Phone number not available'}</td>
                                <td className="border-t text-center py-4 px-4">{parcel.deliveryAddress}</td>
                                <td className="border-t text-center flex lg:flex-row flex-col gap-2 items-center py-4  px-4">

                                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                    <button className="bg-green-500 hover:bg-green-700   text-white font-bold py-1 px-2 rounded" onClick={() => handleLocation(parcel)}>Location</button>
                                    <dialog id="my_modal_3" className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-error absolute right-2 top-2">✕</button>
                                            </form>
                                            <div className='my-10'>

                                                <MapContainer center={[parcel.deliveryLatitude,parcel.deliveryLongitude]} zoom={13} style={{ height: "50vh", width: "100%" }}>
                                                    <TileLayer
                                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                    />
                                                    <Marker position={[parcel.deliveryLatitude,parcel.deliveryLongitude]} icon={customIcon}>
                                                        <Popup>
                                                            Hotel Borcelle <br /> Your wishable stay spot .
                                                        </Popup>
                                                    </Marker>
                                                </MapContainer>
                                            </div>
                                        </div>
                                    </dialog>
                                    <button onClick={() => handleCancel(parcel)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" >Cancel</button>
                                    <button onClick={() => handleDelivered(parcel)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded" >Delivered</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default MyDeliveryList;