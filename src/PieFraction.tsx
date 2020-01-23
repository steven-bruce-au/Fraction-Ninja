import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import styles from './PieFraction.module.scss';

/** Data point for use by recharts */
class DataPoint {
  name: string
  value: number

  constructor(name: string, value: number) {
    this.name = name;
    this.value = 1;
  }
}

type PieState = {
  data: Array<DataPoint>
}

type PieProps = {
  numerator: number,
  denominator: number,
  equal: boolean
}

/** Renders a pie chart using the D3 library via recharts
*/
export default class PieFraction extends React.Component<PieProps, PieState> {

  constructor(props: any) {
    super(props);
    this.state = {
      data: this.fractionData(props.numerator,props.denominator)
    }
  }

  /** Handle an updated chart value
  @param prevProps the previous properties
  */
  componentDidUpdate(prevProps: PieProps) {
      if(prevProps.numerator !== this.props.numerator || prevProps.denominator !== this.props.denominator) {
        this.setState({ data: this.fractionData(this.props.numerator, this.props.denominator)});
      }
  }

  /** construct an array of data points
  @param numerator The value of the numerator
  @param denominator The value of the denominator
  @return an array of data points
  */
  fractionData(numerator: number, denominator: number) : Array<DataPoint> {
    if(denominator > 0) {
      const array = this.fractionData(numerator, denominator - 1);
      array.push(new DataPoint(numerator.toString(), denominator));
      return array;
    } else {
      return new Array<DataPoint>();
    }
  }

  /** Determine the colour of the pie slice
  @param index The pie slice
  */
  colour(index:number): string {
    if(this.props.equal) {
      // green or grey
      return index < this.props.numerator ? "#0e0" : "#9a9"
    } else {
      // red or grey
      return index < this.props.numerator ? "#e00" : "#a99"
    }
  }

  render() {
    return (
     <div className={styles.chart}>
     <ResponsiveContainer width="100%" height="100%">
       <PieChart>
          <Pie
            data={this.state.data}
            labelLine={false}
            startAngle={90}
            endAngle={450}
            animationDuration={0}
            outerRadius={'100%'}
            fill="#8884d8"
            dataKey="value"
          >
            {
              this.state.data.map((entry, index) => <Cell key={`cell-${index}`} fill={this.colour(index)} />).reverse()
            }
          </Pie>
        </PieChart>
       </ResponsiveContainer>
      </div>
    );
  }
}
