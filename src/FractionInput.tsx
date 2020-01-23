import React from 'react';
import { FractionState } from './FractionState';
import styles from './FractionInput.module.scss'

/** Type used by the FractionInput props */
export interface FractionInputProps {
  fractionState: FractionState;
    numeratorUpdated(numerator: number): void;
    denominatorUpdated(denominator: number): void;
}


/** Render the value of the fraction numerator and denominator along with the buttons to increment and decrement them
*/
export default class FractionInput extends React.Component<FractionInputProps, {}> {

  constructor(props: FractionInputProps) {
    super(props);
    this.state = {
    };

    this.handleNumeratorChange = this.handleNumeratorChange.bind(this);
    this.handleDenominatorChange = this.handleDenominatorChange.bind(this);

  }

  /** Handler for the denominator value changing, used by both increment and decrement
  @param the new denominator value
  @return a callback for the button component to trigger the change
  */
  handleDenominatorChange(denominator: number) : (event: any) => void {
    return (event: any) => {
      this.props.denominatorUpdated(denominator);
    }
  }

 /** Handler for the numerator value changing, used by both increment and decrement
  @param the new numerator value
  @return a callback for the button component to trigger the change
  */
  handleNumeratorChange(numerator: number) : (event: any) => void {
    return (event: any) => {
       this.props.numeratorUpdated(numerator);
    }
  }

  render() : JSX.Element {
    const { numerator, denominator} = this.props.fractionState;

    return (
       <div className={styles.fraction}>
         <div className={styles.fractionRow} >
          <button className={styles.button} onClick={this.handleNumeratorChange(numerator - 1)}> - </button>
          <div className={`${styles.number} ${styles.underline} ${styles.numerator}`}> { numerator }</div>
          <button className={styles.button} onClick={this.handleNumeratorChange(numerator + 1)}> + </button>
        </div>

         <div className={styles.fractionRow} >
          <button className={styles.button} onClick={this.handleDenominatorChange(denominator - 1)}>-</button>
          <div className={`${styles.number} ${styles.denominator}`}> {denominator}</div>
          <button className={styles.button} onClick={this.handleDenominatorChange(denominator + 1)}>+</button>
        </div>
       </div>
    );
  }
}
