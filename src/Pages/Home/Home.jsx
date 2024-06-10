import AppStatistics from "@/components/AppStatistics/AppStatistics";
import Banner from "@/components/Banner/Banner";
import Feature from "@/components/Feature/Feature";



const Home = () => {
    return (
        <div>
            <Banner></Banner> 
            <Feature></Feature>
            <AppStatistics></AppStatistics>
        </div>
    );
};

export default Home;