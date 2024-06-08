import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const CheckOut = () => {
    // TODO:
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)
    return (
        <div>
            <div className="text-center mb-12">
                <h2 className="text-5xl eb-serif text-green-500 font-bold">Checkout</h2>
                <p className="text-gray-600 mt-4">Here you can payment for your booked parcels</p>
                <p className='border-b-2 border-[#4acf3d] w-60 mt-3 mb-8 mx-auto'>----------------</p>
            </div>
            <div className="w-1/2 mx-auto">
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default CheckOut;