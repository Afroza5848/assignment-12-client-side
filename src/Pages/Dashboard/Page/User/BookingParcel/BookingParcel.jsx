import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


const BookingParcel = () => {
    const { user } = useAuth();
    const [price, setPrice] = useState(Number)
    const [weight, setWeight] = useState(Number)
    const axiosSecure = useAxiosSecure();
    // calculate price by parcel weight
    const handlePrice = (e) => {
        e.preventDefault();
        const weight = parseInt(e.target.value);
        setWeight(weight)
        console.log(price);
        console.log(weight);
        if (weight < 1) {
            toast.error('Minimum weight must be 1 Kg')
        }

        if (weight === parseInt(1) || weight > 0) {
            setPrice(weight * 50)
        }
        if (weight === parseInt(2)) {
            setPrice(weight * 100)
        }
        if (weight > parseInt(2)) {
            setPrice(weight * 150)
        }

    }
    // booking parcel  save database
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        console.log(data);
        const { phone, parcelType, receiverName, receiverPhone, deliveryAddress, deliveryDate, deliveryLatitude, deliveryLongitude } = data;
        const bookingParcel = {
            name: user?.displayName,
            email: user?.email,
            phone: parseInt(phone),
            parcelType: parcelType,
            parcelWeight: weight,
            receiverName: receiverName,
            receiverPhone: receiverPhone,
            deliveryAddress: deliveryAddress,
            deliveryDate: deliveryDate,
            deliveryLatitude: parseFloat(deliveryLatitude),
            deliveryLongitude: parseFloat(deliveryLongitude),
            parcelPrice: price,
            bookingDate: new Date().toLocaleDateString(),
            status: 'pending'
        }

        try {
            const result = await axiosSecure.post('/parcels', bookingParcel)
            console.log(result.data);
            if (result.data.insertedId) {
                // update number of book parcel and update total spent
                const res = await axiosSecure.patch('/updateUser', bookingParcel)
                console.log('update book',res.data);

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user?.displayName}, Your Parcel Booked`,
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
            }



        } catch (err) {
            console.log(err);
        }


    }

    return (
        <section className="container mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-5xl text-green-500 eb-serif font-bold">Book a Parcel</h2>
                <p className="text-gray-600 mt-4">Fill in the details below to book a parcel for delivery</p>
                <p className='border-b-2 border-[#4acf3d] w-60 mt-3 mb-8 mx-auto'>----------------</p>
            </div>
            <div className="lg:w-3/5 mx-auto bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit(onSubmit)} id="bookParcelForm">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                            <input type="text" id="name" name="name" className="w-full border-gray-200 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" readOnly value={user?.displayName} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                            <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-green-500" readOnly value={user?.email} />
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone Number</label>
                            <input type="text" id="phone" name="phone" className="w-full border-gray-200 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" placeholder="Enter your phone number" {...register("phone", { required: true })} />
                            {errors.phone && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="parcelType" className="block text-gray-700 font-bold mb-2">Parcel Type</label>
                            <input type="text" id="parcelType" name="parcelType" className="w-full border-gray-200 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" placeholder="Enter parcel type" {...register("parcelType", { required: true })} />
                            {errors.parcelType && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
                        <div className="mb-4">
                            <label htmlFor="parcelWeight" className="block text-gray-700 font-bold mb-2">Parcel Weight (kg)</label>
                            <input onChange={handlePrice} type="number" id="parcelWeight" name="parcelWeight" className="w-full border-gray-200 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" placeholder="Enter parcel weight" />

                        </div>
                        <div className="mb-4">
                            <label htmlFor="receiverName" className="block text-gray-700 font-bold mb-2">Receiver’s Name</label>
                            <input type="text" id="receiverName" name="receiverName" className="w-full border-gray-200 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" placeholder="Enter receiver's name" {...register("receiverName", { required: true })} />
                            {errors.receiverName && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
                        <div className="mb-4">
                            <label htmlFor="receiverPhone" className="block text-gray-700 font-bold mb-2">Receivers Phone Number</label>
                            <input type="text" id="receiverPhone" name="receiverPhone" className="w-full border-gray-200 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" placeholder="Enter receiver's phone number" {...register("receiverPhone", { required: true })} />
                            {errors.receiverPhone && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="deliveryAddress" className="block text-gray-700 font-bold mb-2">Parcel Delivery Address</label>
                            <input type="text" id="deliveryAddress" name="deliveryAddress" className="w-full border-gray-200 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" placeholder="Enter delivery address" {...register("deliveryAddress", { required: true })} />
                            {errors.deliveryAddress && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="deliveryDate" className="block text-gray-700 font-bold mb-2">Requested Delivery Date</label>
                        <input type="date" id="deliveryDate" name="deliveryDate" className="w-full border-gray-200 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" {...register("deliveryDate", { required: true })} />
                        {errors.deliveryDate && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="deliveryLatitude" className="block text-gray-700 font-bold mb-2">Delivery Address Latitude</label>
                        <input type="text" id="deliveryLatitude" name="deliveryLatitude" className="w-full border-gray-200 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" placeholder="Enter latitude" {...register("deliveryLatitude", { required: true })} />
                        {errors.deliveryLatitude && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="deliveryLongitude" className="block text-gray-700 font-bold mb-2">Delivery Address Longitude</label>
                        <input type="text" id="deliveryLongitude" name="deliveryLongitude" className="w-full border-gray-200 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" placeholder="Enter longitude" {...register("deliveryLongitude", { required: true })} />
                        {errors.deliveryLongitude && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price (Tk)</label>
                        <input type="number" id="price" name="price" className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-green-500" readOnly value={price} />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="px-4 py-2 bg-green-600 login text-white rounded-lg hover:bg-green-700">Book Parcel</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default BookingParcel;