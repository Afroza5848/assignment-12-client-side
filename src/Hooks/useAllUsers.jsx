import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const {data: allUsers = [], isLoading, refetch} = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const result = await axiosSecure.get('/allUsers');
            return result.data;
        }
    })
    return [allUsers,isLoading,refetch ]
};

export default useAllUsers;