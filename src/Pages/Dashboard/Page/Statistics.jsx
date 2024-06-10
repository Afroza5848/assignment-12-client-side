// import useAllParcels from "@/Hooks/useAllParcels";
// import useAxiosSecure from "@/Hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import Chart from "react-apexcharts";

// const Statistics = () => {
//     const [parcels] = useAllParcels();
    

//     useEffect(() => {
//         if(parcels.length > 0){
//             const dateCounts = {};
//             const bookedCounts = {};
//             const deliveredCounts = {};

//             parcels.forEach((item) => {
//                 const date = item.bookingDate;
//                 if(!bookedCounts[date]){
//                     dateCounts[date] = 0
//                 }
//                 dateCounts[date] += 1

//                 if(!bookedCounts[date]){
//                    bookedCounts[date] = 0
//                 }

//                 if(!deliveredCounts[date]){
//                     deliveredCounts[date] = 0
//                 }
//                 bookedCounts[date] += 1

//                 if(item.status === 'Delivered'){
//                     deliveredCounts[date] += 1 
//                 }
//             });
//         }
//      },[parcels])
    
//       const [state,setState]  = useState({
        


//         options: {
//             chart: {
//                 id: "basic-bar"
//             },
//             xaxis: {
//                 categories: []
//             }
//         },
//         series: [
//             {
//                 name: 'bookings',
//                 data: []
//             }
//         ],
//         fill: {
//             colors: ['#F00']
//         },
//       })
        

   

//     return (
//         <div className="z-[-1]">
//             <section className="dark:bg-gray-100 z-[-1] dark:text-gray-800">
//                 <div className="container flex flex-col items-center justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
//                     <div className="app">
//                         <div className="row">
//                             <div className="mixed-chart">
//                                 <Chart
//                                     options={state.options}
//                                     series={state.series}
//                                     type="bar"
//                                     width="500"
//                                     fill={state.fill}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
//                         <Chart
//                             options={state.options}
//                             series={state.series}
//                             type="line"
//                             width="500"
//                         />
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }


// export default Statistics;
import useAllParcels from "@/Hooks/useAllParcels";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const Statistics = () => {
  const [parcels] = useAllParcels();
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: []
      }
    },
    series: [
      {
        name: 'Bookings',
        data: []
      },
      {
        name: 'Delivered Parcels',
        data: []
      }
    ],
    fill: {
      colors: ['#F00']
    }
  });

  const [lineData, setLineData] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: []
      }
    },
    series: [
      {
        name: 'Bookings',
        data: []
      },
      {
        name: 'Delivered Parcels',
        data: []
      }
    ],
    fill: {
      colors: ['#F00']
    }
  });

  useEffect(() => {
    if (parcels.length > 0) {
      const dateCounts = {};
      const bookedCounts = {};
      const deliveredCounts = {};

      parcels.forEach((item) => {
        const date = item.bookingDate.split('T')[0]; // Adjust based on date format
        if (!dateCounts[date]) {
          dateCounts[date] = 0;
        }
        dateCounts[date] += 1;

        if (!bookedCounts[date]) {
          bookedCounts[date] = 0;
        }
        bookedCounts[date] += 1;

        if (!deliveredCounts[date]) {
          deliveredCounts[date] = 0;
        }
        if (item.status === 'Delivered') {
          deliveredCounts[date] += 1;
        }
      });

      const dates = Object.keys(dateCounts).sort();
      const bookedData = dates.map(date => bookedCounts[date]);
      const deliveredData = dates.map(date => deliveredCounts[date]);

      setState(prevState => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: dates
          }
        },
        series: [
          {
            name: 'Bookings',
            data: bookedData
          },
       
        ]
      }));

      setLineData(prevState => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: dates
          }
        },
        series: [
          {
            name: 'Bookings',
            data: bookedData
          },
          {
            name: 'Delivered Parcels',
            data: deliveredData
          }
        ]
      }));
    }


    
  }, [parcels]);

  return (
    <div className="z-[-1]">
      <section className="dark:bg-gray-100 z-[-1] dark:text-gray-800">
        <div className="container flex flex-col items-center justify-center py-10 px-6 mx-auto lg:flex-row  gap-12">
          <div className="app">
            <div className="row">
              <div className="mixed-chart">
                <Chart
                  options={state.options}
                  series={state.series}
                  type="bar"
                  width="500"
                  fill={state.fill}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <Chart
              options={lineData.options}
              series={lineData.series}
              type="line"
              width="500"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Statistics;
