import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Chart from "react-apexcharts";

const Statistics = () => {
    const axiosSecure = useAxiosSecure()
    const {data: date = []} = useQuery({
        queryKey: ['data'],
        queryFn: async() => {
            const res = await axiosSecure.get('/date')
            return res.data
        }
    })
    console.log(date);
    const [state, setState] = useState({
        
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ],
        fill: {
            colors: ['#F00']
        },

    })

    return (
        <div className="z-[-1]">
            <section className="dark:bg-gray-100 z-[-1] dark:text-gray-800">
                <div className="container flex flex-col items-center justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                    <div className="app">
                        <div className="row">
                            <div className="mixed-chart">
                                <Chart
                                    options={state.options}
                                    series={state.series}
                                    type="bar"
                                    width="600"
                                    fill={state.fill}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                        <Chart
                            options={state.options}
                            series={state.series}
                            type="line"
                            width="600"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}


export default Statistics;
