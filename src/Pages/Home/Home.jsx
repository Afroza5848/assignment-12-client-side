import AppStatistics from "@/components/AppStatistics/AppStatistics";
import Banner from "@/components/Banner/Banner";
import Feature from "@/components/Feature/Feature";
import TopDeliverymen from "@/components/TopDeliverymen/TopDeliverymen";



const Home = () => {
    return (
        <div>
            <Banner></Banner> 
            <Feature></Feature>
            <AppStatistics></AppStatistics>
            <TopDeliverymen></TopDeliverymen>
        </div>
    );
};

export default Home;