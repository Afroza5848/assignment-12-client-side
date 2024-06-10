import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useMyReview = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {data: reviews = []} = useQuery({
        queryKey: ['reviews'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/myReview/${user?.email}`)
            return res.data;
        }
    })
    return [reviews];
};

export default useMyReview;