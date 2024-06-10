import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import booked from '../../assets/image/order.png'
import parcel from '../../assets/image/parcel.png'
import group from '../../assets/image/group.png'
import CountUp from 'react-countup';
import { useInView } from "react-intersection-observer";


const AppStatistics = () => {
    const axiosPublic = useAxiosPublic();
    const { data: stats = {} } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await axiosPublic.get('/total-all')
            return res.data
        }
    })
    // countup--------------------
    const { ref, inView } = useInView({
        triggerOnce: true,  // Trigger animation only once
        threshold: 0.1      // Trigger when 10% of the component is in view
      });
    console.log(stats);
    return (
        <div className="container mx-auto py-16">
            <div className="text-center mb-12  ">
                <h2 className="text-5xl font-bold eb-serif">Our<span className='text-[#4acf3d]'> App Usage Statistics</span></h2>
                <p className='border-b-2 border-[#4acf3d] w-60 mt-3 mb-8 mx-auto'>----------------</p>
            </div>
            <h2 className="text-5xl eb-serif font-bold mb-8 text-center"></h2>
            <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-[#4acf3d24] p-6 rounded-lg shadow-md text-center">
                    <p className="text-6xl font-bold mb-4 text-yellow-600"> +
                    {inView && <CountUp end={stats.totalParcelBooked} duration={2.5} />}
                        </p>
                    <img className="mx-auto my-3  w-[80px]" src={booked} alt="" />
                    <h3 className="text-2xl font-semibold mb-4 monts">Total Parcels Booked</h3>

                </div>
                <div className="bg-[#4acf3d24] p-6 rounded-lg shadow-md text-center">
                    <p className="text-6xl font-bold mb-4 text-green-600"> +  {inView && <CountUp end={stats.totalParcelDelivered} duration={3} />}</p>
                    <img className="mx-auto my-3 w-[80px]" src={parcel} alt="" />
                    <h3 className="text-2xl font-semibold mb-4 monts">Total Parcels Delivered</h3>

                </div>
                <div className="bg-[#4acf3d24] p-6 rounded-lg shadow-md text-center">
                    <p className="text-6xl font-bold text-purple-600 mb-4"> +  {inView && < CountUp end={stats.totalUsers} duration={5} />}</p>
                    <img className="mx-auto my-3  w-[80px]" src={group} alt="" />
                    <h3 className="text-2xl font-semibold mb-4 monts">Total Users</h3>

                </div>
            </div>
        </div>
    );
};

export default AppStatistics;