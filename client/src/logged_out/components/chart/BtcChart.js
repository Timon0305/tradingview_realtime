import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Chart from "./Chart";

// const url = "wss://ws-feed.gdax.com";
const url = "ws://127.0.0.1:8080";
const styles = (theme) => ({
  "chart-container": {
    margin: 100,
    width: 1680,
    height: 660,
  },
});

class BtcChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lineChartData: {
        labels: [],
        datasets: [
          {
            type: "line",
            label: "BTC-USD",
            backgroundColor: "rgba(119, 136, 153, 0.15)",
            borderColor: this.props.theme.palette.primary.main,
            pointBackgroundColor: this.props.theme.palette.success.main,
            pointBorderColor: this.props.theme.palette.success.main,
            borderWidth: "2",
            lineTension: 0.45,
            data: [],
          },
        ],
      },
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
        },
        title:{
              display:true,
              text:'BTC/USD',
              fontSize:20
            },
        scales: {
          xAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
              },
            },
          ],
        },
      },
    };
  }

  componentDidMount() {
    const subscribe = {
      type: "subscribe",
      channels: [
        {
          name: "ticker",
          product_ids: ["BTC-USD"],
        },
      ],
    };

    this.ws = new WebSocket(url);
    var id = 0;
    var sender = this.ws;

    this.ws.onopen = () => {
      // console.log('ws opened');
      id = setInterval(function () {
        sender.send(JSON.stringify(subscribe), function () {
          //
          // Ignore errors.
          //
        });
      }, 1500);
    };
    this.ws.onerror = function (event) {
      console.log("Error: " + event.type);
    };
    // };
    this.ws.onclose = function (evt) {
      if (evt.code === 3001) {
        console.log("ws closed");
        this.ws = null;
      } else {
        this.ws = null;
        console.log("ws connection error: " + evt.code);
      }
      if (id > 0) {
        clearInterval(id);
      }
    };
    var iter = 0;
    this.ws.onmessage = (e) => {
      if (iter > 3000) /* for Test */ return;
      const value = JSON.parse(e.data);
      console.log(value);
      if (value.type !== "ticker") {
        return;
      }
      iter++;

      const oldBtcDataSet = this.state.lineChartData.datasets[0];
      const newBtcDataSet = { ...oldBtcDataSet };
      newBtcDataSet.data.push(value.price);

      const newChartData = {
        ...this.state.lineChartData,
        datasets: [newBtcDataSet],
        labels: this.state.lineChartData.labels.concat(
          new Date().toLocaleTimeString()
        ),
      };
      this.setState({ lineChartData: newChartData });
    };
  }

  componentWillUnmount() {
    this.ws.close();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes["chart-container"]}>
        <Chart
          data={this.state.lineChartData}
          options={this.state.lineChartOptions}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BtcChart);
