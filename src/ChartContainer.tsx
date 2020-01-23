import React from 'react';
import memoize from "fast-memoize";

import PieFraction from './PieFraction';
import { FractionState } from './FractionState';
import styles from './ChartContainer.module.scss'

type ChartData = {
  equal: boolean,
  fractionState: FractionState,
  maxCharts: number
}

/** Chart container renders multiple PieFractions determined by the ChartData */
export default class ChartContainer extends React.Component<ChartData, {}> {

  constructor(props: ChartData) {
    super(props);
    this.state = {
    };
  }

  chartWidth = memoize(
    (charts: number, maxCharts: number)  =>  { return { width: `${charts * 100/maxCharts}%`}; }
  );

  render() : JSX.Element {
    const { numerator, denominator, charts } = this.props.fractionState;
    const { equal, maxCharts } = this.props;

    // Build an array of whole pie charts, empty if value of fraction is not greater than one
    const wholePies = new Array<JSX.Element>();
      for(let i = 1; i < charts; i++) {
        // add "whole" charts as necessary for fractions > 1
        wholePies.push(<PieFraction equal={equal} numerator={denominator} denominator={denominator}/>);
      }

     // The last pie chart, the fractional part
     const remainder = (numerator === 0) ? <PieFraction equal={equal} numerator={0} denominator={denominator}/> : 
                                         <PieFraction equal={equal} numerator={numerator - (charts - 1) * denominator} denominator={denominator}/>
    return (
       <div className={styles.chartContainer} style={this.chartWidth(charts, maxCharts)}>
            {wholePies}
            {remainder}
       </div>
    );
  }
}
