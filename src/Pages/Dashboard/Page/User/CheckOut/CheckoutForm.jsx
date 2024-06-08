import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useMyParcels from "@/Hooks/useMyParcels";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckoutForm = () => {
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [parcels] = useMyParcels();

    // Calculate total parcel price
    const totalParcelPrice = parcels.reduce((total, item) => total + item.parcelPrice, 0);
    console.log(totalParcelPrice);

    useEffect(() => {
        // Create PaymentIntent as soon as the component loads
        axiosSecure.post('/create-payment-intent', { parcelPrice: totalParcelPrice })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })
            .catch(err => {
                console.error("Error creating payment intent:", err);
                toast.error("Failed to create payment intent");
            });
    }, [axiosSecure, totalParcelPrice]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.error('Payment error', error);
            toast.error(error.message);
        } else {
            console.log('Payment method', paymentMethod);
            toast.success("Payment method created successfully");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button
                type="submit"
                className="login disabled:opacity-20 px-10 py-2 text-xl text-white eb-serif font-bold rounded mt-8"
                disabled={!stripe || !clientSecret}
            >
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;
