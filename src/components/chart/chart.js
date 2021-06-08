import React from 'react';
import { Line } from 'react-chartjs-2';





export default class App extends React.Component {
  componentDidUpdate() {
    if (this.props.date !== this.state.date) {
      this.setState({ date: this.props.date })
      this.setdata();
    }
  }
  componentDidMount() {
    this.setdata();
    console.log("called")
  }

  constructor(props) {
    super(props)
    this.state = {
      date: this.props.date,
      labels: [],
      datasets: [
        {
          label: [],
          backgroundColor: 'white',
          borderColor: 'white',
          borderWidth: 2,
          data: [],

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
  }
  setdata = () => {
    const d = this.props.data.map((e, i) => {
      return e.main.temp
    })
    const labels = this.props.data.map((e, i) => {
      return e.dt_txt.split(" ")[1]
    })
    // this.setState({labels})
    this.setState({
      labels,
      datasets: [
        {
          label: [],
          backgroundColor: 'white',
          borderColor: 'white',
          borderWidth: 2,
          data: d,

        },

      ]
    })
    this.props.data && console.log(labels, d)

  }


  render() {
    return (
      <div>
        {console.log(this.props.data)}
        {console.log(this.state)}
        <Line
          data={this.state}
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