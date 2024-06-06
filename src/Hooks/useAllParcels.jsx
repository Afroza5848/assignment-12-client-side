import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAllParcels = () => {
    const axiosSecure = useAxiosSecure();

    const {data: parcels = [], isLoading, refetch} = useQuery({
        queryKey: ['parcels'],
        queryFn: async() => {
            const result = await axiosSecure.get('/parcels')
            return result.data;
        }
    })
    return [parcels, isLoading, refetch]
};

export default useAllParcels;