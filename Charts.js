import React, { Component } from "react";
import { Line, bar, Bar } from "react-chartjs-2";
export default class charts extends Component {
  state = {
    data: {
      labels: ["1", "2", "3", "4", "5"],
      datasets: [
        {
          label: "video",
          data: [4, 5, 1, 10, 320, 2, 102],
        },
      ],
    },
  };
  render() {
    return (
      <div style={{ position: "relative", width: "20%", height: "20%" }}>
        <Line data={this.state.data} />
      </div>
    );
  }
}
