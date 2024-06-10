import useMyReview from "@/Hooks/useMyReview";


const MyReview = () => {
    const [reviews] = useMyReview();
    console.log(reviews);
    return (
        <section className="container mx-auto py-16">
            <div className="text-center mb-12">
                <h2 className="text-5xl eb-serif text-green-500 font-bold">My Reviews</h2>
                <p className="text-gray-600 mt-4">Here you can see all the reviews from users</p>
                <p className='border-b-2 border-[#4acf3d] w-60 mt-3 mb-8 mx-auto'>----------------</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review) => (
                    <div key={review._id} className="bg-base-200  p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <img
                                src={review.image}
                                alt={review.name}
                                className="w-20 h-20 rounded-full mr-4"
                            />
                            <div>
                                <h3 className="text-2xl uppercase text-green-500 eb-serif font-semibold">{review.name}</h3>
                                <p className="text-gray-600 text-xl">
                                    {new Date(review.reviewGivingDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="text-yellow-500 text-xl">
                                {'★'.repeat(review.rating)}
                                {'☆'.repeat(5 - review.rating)}
                            </span>
                            <span className="ml-2 text-gray-600 text-xl">{review.rating} out of 5</span>
                        </div>
                        <p className="text-gray-700 text-xl">{review.feedback}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MyReview;