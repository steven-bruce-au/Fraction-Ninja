import React from 'react';
import { FractionState } from './FractionState';
import FractionInput from './FractionInput';
import ChartContainer from './ChartContainer';
import styles from './FractionComparator.module.scss';

enum FractionColumn {
    LEFT = 0,
    RIGHT = 1
}


type FractionComparatorState = {
  fractions: Array<FractionState>,
  equal: boolean
}

/** State is lifted up to this component. It receives events from child components and orchestrates them */
export default class FractionComparator extends React.Component<{}, FractionComparatorState> {

  constructor(props: any) {
    super(props);
    this.state = {
      fractions: [ new FractionState(), new FractionState() ],
      equal: true
    };

    this.handleNumeratorChange = this.handleNumeratorChange.bind(this);
    this.handleDenominatorChange = this.handleDenominatorChange.bind(this);
  }

  /** Construct the FractionComparatorState object based on an event modifying the current state 
    @param existingFunctions The existing state of the object
    @param numerator The new numerator for the changed fraction
    @param denominator The new denominator for the changed fraction
    @param updatedFractionColumn The fraction that has changed
    @return The new comparator state
  */
  private buildState(existingFractions: Array<FractionState>, numerator: number, denominator: number, updatedFractionColumn: FractionColumn) : FractionComparatorState {
     // copy and update the fractions
      const fractionsCopy = Array.from(existingFractions);
      fractionsCopy[updatedFractionColumn] = new FractionState(numerator, denominator);

      const equal = fractionsCopy[FractionColumn.LEFT].value === fractionsCopy[FractionColumn.RIGHT].value;

      return {
        fractions: fractionsCopy,
        equal: equal
      };
  }

  /** Factory function to handle a denominator change from the specified fraction child object
  @param fractionColumn The fraction column that is setting up this event handler
  @return A function to update the state of this component in response to the denominator change
  */
  handleDenominatorChange(fractionColumn: FractionColumn) : (denominator: number) => void {
    return  (denominator: number) => {
        if(denominator > 0) {
          this.setState((state, props) => {
              // figure out the new fraction
              return this.buildState(this.state.fractions, state.fractions[fractionColumn].numerator, denominator, fractionColumn);
              });
          }
      };
  }

  /** Factory function to handle a numerator change from the specified fraction child object
  @param fractionIndex The fraction column that is setting up this event handler
  @return A function to update the state of this component in response to the denominator change
  */
  handleNumeratorChange(fractionColumn: FractionColumn) : (numerator: number) => void  {
    return (numerator: number) => {
        if(numerator >= 0) {
          this.setState((state, props) => {
            // figure out new fraction
            return this.buildState(this.state.fractions, numerator, state.fractions[fractionColumn].denominator, fractionColumn);
          });
        }
        
     };
  }

  /** Render the specified column
  @param fractionIndex The specified fraction column to render
  @param maxCharts The maximum number of charts in either column, so spacing is uniform
  @return The rendered output
  */
  private renderColumn(fractionColumn:FractionColumn, maxCharts: number) : JSX.Element {
       const fractionState = this.state.fractions[fractionColumn];
       const { numerator, denominator } = fractionState;

       return (
         <div className={styles.column}>
           <FractionInput  fractionState={fractionState} 
                   numeratorUpdated={this.handleNumeratorChange(fractionColumn)} 
                   denominatorUpdated={this.handleDenominatorChange(fractionColumn)} /> 

           <ChartContainer equal={this.state.equal} fractionState={fractionState} maxCharts={maxCharts} /> 
           <div className={styles.decimal}>{Math.round(100 * numerator/denominator)/100}</div>
         </div>
       );
  }

  render() : JSX.Element {
    const { fractions } = this.state;
    const maxCharts = Math.max(fractions[FractionColumn.LEFT].charts, fractions[FractionColumn.RIGHT].charts);
    
    return (
      <div className={styles.mainContainer}>
        { this.renderColumn(FractionColumn.LEFT, maxCharts) }
        { this.renderColumn(FractionColumn.RIGHT, maxCharts) }
      </div>
    );
  }

}
