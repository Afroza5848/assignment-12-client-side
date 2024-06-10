import useAllDeliverymen from "@/Hooks/useAllDeliverymen";



const AllDeliverymen = () => {
    const [deliveryMens] = useAllDeliverymen()
    

   console.log(deliveryMens);

    return (
        <div className="container mx-auto py-16">
            <h2 className="text-5xl text-center eb-serif text-green-500 font-bold mb-8">All Delivery Men</h2>
            <p className='border-b-2 border-[#4acf3d] text-center w-60 mt-3 mb-8 mx-auto'>----------------</p>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="login text-white">
                        <tr>
                            <th className="px-4 py-4 border-b text-center">Name</th>
                            <th className="px-4 py-4 border-b text-center">Phone Number</th>
                            <th className="px-4 py-4 border-b text-center">Parcels Delivered</th>
                            <th className="px-4 py-4 border-b text-center">Average Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveryMens.map((man) => (
                            <tr key={man._id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2 text-center">{man.name}</td>
                                <td className="px-4 py-2 text-center">{man.phone}</td>
                                <td className="px-4 py-2 text-center">{man.parcelDelivered}</td>
                                <td className="px-4 py-2 text-center">{(man.totalRating / man.ratingNumber) ? (man?.totalRating / man?.ratingNumber).toFixed() : 'no review' }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDeliverymen;


