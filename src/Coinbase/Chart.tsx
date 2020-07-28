import React from "react";
import { Svg } from "react-native-svg";
import { scaleLinear } from "d3-scale";

import Candle from "./Candle";
import { SIZE, STEP, CANDLES, DOMAIN } from "./ChartHelpers";

const Chart = () => {
  const scaleY = scaleLinear().domain(DOMAIN).range([SIZE, 0]);
  const scaleBody = scaleLinear()
    .domain([0, Math.max(...DOMAIN) - Math.min(...DOMAIN)])
    .range([0, SIZE]);
  return (
    <Svg width={SIZE} height={SIZE}>
      {CANDLES.map((candle, index) => (
        <Candle
          key={candle.date}
          width={STEP}
          {...{ candle, index, scaleY, scaleBody }}
        />
      ))}
    </Svg>
  );
};

export default Chart;
