import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";



const useMyParcels = () => {
    const {user, loading} = useAuth()
    const axiosSecure = useAxiosSecure();
    const {data: parcels = [] , isLoading, refetch} = useQuery({
        queryKey: ['parcels'],
        enabled: !loading && !!user?.email,
        queryFn: async() => {
            const result = await axiosSecure.get(`/parcels/${user?.email}`)
            return result.data;
        }
    })
    return [ parcels, isLoading, refetch];
};

export default useMyParcels;