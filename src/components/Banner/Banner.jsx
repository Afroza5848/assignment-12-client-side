
import img1 from "../../assets/image/img1.jpg"
import img2 from "../../assets/image/img2.jpg"
import img3 from "../../assets/image/img3.jpg"
import img4 from "../../assets/image/img4.jpg"
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTypewriter, Cursor } from 'react-simple-typewriter'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 2000)}s`;
    };
    const [typeEffect] = useTypewriter({
        words: [' Brothers', 'Sisters',],
        loop: {},
        typeSpeed: 600,
        delaySpeed: 30,
    });
    return (

        <>

            <section className="lg:mb-[80px] md:mb-[60px] mb-[40px] relative">
                <div className="">
                    <div className="relative ">
                        <Swiper
                            spaceBetween={10}
                            centeredSlides={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            loop={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            onAutoplayTimeLeft={onAutoplayTimeLeft}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <img className="md:h-[80vh] h-[40vh] w-full rounded" src={img1} alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className="md:h-[80vh] h-[40vh] w-full rounded" src={img2} alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className="md:h-[80vh] h-[40vh] w-full rounded" src={img3} alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className="md:h-[80vh] h-[40vh] w-full rounded" src={img4} alt="" />
                            </SwiperSlide>


                            <div className="autoplay-progress w-12 h-12 absolute bottom-12 z-20 right-4 bg-transparent" slot="container-end">
                                <svg viewBox="0 0 48 48" ref={progressCircle}>
                                    <circle cx="24" cy="24" ></circle>
                                </svg>
                                <span className="border-2 border-slate-900 px-3 py-2 rounded-full" ref={progressContent}></span>
                            </div>
                        </Swiper>
                        {/* Overlay */}
                        <div className="absolute inset-0 z-20 bg-[#22222263] "></div>
                    </div>

                    <div className="container flex flex-col absolute inset-y-8 -inset-x-1/2 z-50 items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 dark:text-gray-50">
                        <h1 className=" font-bold leading-none lg:text-6xl text-4xl xl:max-w-3xl text-[#4acf3d] monts">Congratulations
                            <span className="ml-2 text-gray-100">
                                {typeEffect}
                            </span>
                            <Cursor cursorColor='white' />
                        </h1>
                        <p className="mt-6 mb-8 text-2xl sm:mb-12 xl:max-w-3xl text-gray-50 poppins">Welcome to ParcelPro!</p>
                        <div className="flex flex-wrap justify-center">
                            {/* <button type="button" className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-gray-800 dark:text-gray-100">Shop Now</button> */}
                            <button type="button" className="px-8 py-3 m-2 text-lg border rounded border-green-500 text-green-500">Explore more</button>
                        </div>
                    </div>

                </div>

                <div className="lg:w-1/2 w-10/12 py-20 my-auto bg-[#4acf3d] lg:inset-7 flex justify-center items-center  mx-auto mb-12 -mt-0 relative z-50  rounded-lg shadow-md lg:-mt-40">
                    <div className="absolute lg:w-10/12 mx-auto flex lg:flex-row flex-col  justify-center items-center lg:gap-5 gap-2">
                        <input type="text" className="lg:py-8 py-4 lg:w-[70%] w-full rounded lg:text-2xl" placeholder="Type Your Tracking Number" />
                        <button className="relative px-8 lg:py-8 py-4 overflow-hidden font-semibold rounded bg-white dark:text-gray-50 poppins text-2xl">Track Parcel
                            <span className="absolute top-0 right-0 px-5 py-1 text-xs tracking-wider text-center uppercase whitespace-no-wrap text-white origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/3 bg-green-500">New</span>
                        </button>
                    </div>
                </div>


            </section>

        </>




    );
};

export default Banner;