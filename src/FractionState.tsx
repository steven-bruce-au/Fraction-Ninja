
/** Type used to by the FractionComparator to describe the state of a fraction column
*/
export class FractionState {
  numerator: number
  denominator: number
  charts: number // number of whole charts required to render this fraction 
  value: number 

  constructor(numerator: number=1, denominator: number=1) {
  	this.numerator = numerator;
  	this.denominator = denominator;
    this.value = numerator / denominator;
    this.charts = Math.ceil(numerator / denominator);
  }

}