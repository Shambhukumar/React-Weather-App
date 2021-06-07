import React from 'react';
import {Line} from 'react-chartjs-2';

const state = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: [],
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56],
     
    },
    
  ],
  
  options: {
    scales: {
        y: {
            beginAtZero: true
        }
    }
}
}

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Line
          data={state}
          options={{
            scales: {
                yAxis: {
                    ticks: {
                        color: "white"
                    },
                    gridLines: {
                        display: false
                    }
                },
                xAxis: {
                    ticks: {
                        color: "white"
                    },
                    gridLines: {
                        display: false
                    }
                }
            },
    
            legend: {
                color: "white"
              },
              plugins: {
                legend: false,
                
                      
            },
            
            
            
          }}
        />
      </div>
    );
  }
}