import delivery from '../../assets/image/delivery.png'
import clock from '../../assets/image/clock.png';
import fast from '../../assets/image/super.png'

const Feature = () => {
    return (
        <section className="container mx-auto py-16">
            <div className="text-center mb-12  ">
                <h2 className="text-5xl font-bold eb-serif">Our<span className='text-[#4acf3d]'> Features</span></h2>
                <p className="text-gray-600 text-xl mt-4">Discover the benefits of using ParcelPro for your delivery needs</p>
                <p className='border-b-2 border-[#4acf3d] w-60 mt-3 mb-8 mx-auto'>----------------</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="mb-4 w-40 mx-auto hover:scale-110 hover:ease-in-out">
                        <img src={delivery} alt="" />
                    </div>
                    <h3 className="text-3xl font-bold mb-2 monts ">Parcel Safety</h3>
                    <p className="text-gray-600">Ensuring the safety and security of your parcels during transit.</p>
                    
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center ">
                    <div className="mb-4 mx-auto w-40 hover:scale-110 hover:ease-in-out">
                        <img src={fast} alt="" />
                    </div>
                    <h3 className="text-3xl font-bold mb-2 monts">Super Fast Delivery</h3>
                    <p className="text-gray-600">Experience lightning-fast delivery times with our optimized routes.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center ">
                    <div className="mb-4 mx-auto w-40 hover:scale-110 hover:ease-in-out">
                        <img src={clock} alt="" />
                    </div>
                    <h3 className="text-3xl font-bold mb-2 monts">Real-Time Tracking</h3>
                    <p className="text-gray-600">Keep track of your parcels in real-time with our tracking system.</p>
                </div>
            </div>
        </section>
    );
};

export default Feature;