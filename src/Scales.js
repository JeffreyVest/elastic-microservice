import * as d3 from "d3";

export var scaleAcc = d3
  .scaleLinear()
  .domain([0, 1])
  .range([-2, 2]);

export var scaleColor = d3.scaleSequential(d3.interpolateBlues);
