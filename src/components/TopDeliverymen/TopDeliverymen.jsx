import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const TopDeliverymen = () => {
    const axiosPublic = useAxiosPublic();
    const { data: topDeliverymen = [] } = useQuery({
        queryKey: ['topDeliverymen'],
        queryFn: async () => {
            const res = await axiosPublic.get('/top-deliverymen')
            return res.data;
        }
    })
    console.log(topDeliverymen);
    return (
        <div className="container mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 my-12">
            {
                topDeliverymen.map(man => <div key={man?._id} className=" rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
                    <img src={man?.image} alt="" className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500" />
                    <div className="flex flex-col justify-between p-6 space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-3xl text-green-500 eb-serif font-semibold tracking-wide">{man?.name}</h2>
                            <p className="dark:text-gray-800">Parcel Deliverd: {man?.parcelDelivered}</p>
                            <p className="dark:text-gray-800">Average Rating: {man?.averageRating}</p>
                        </div>
                        <button type="button" className="flex login items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50">Read more</button>
                    </div>
                </div>)
            }
        </div>
    );
};

export default TopDeliverymen;