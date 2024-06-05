import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllDeliverymen = () => {
    const axiosSecure = useAxiosSecure();
    const {data: deliveryMens = [], isLoading} = useQuery({
        queryKey: ['deliveryMens'],
        queryFn: async () => {
            const result = await axiosSecure.get('/allDeliveryMens')
            return result.data
        }
    })
    return [deliveryMens, isLoading]
};

export default useAllDeliverymen;