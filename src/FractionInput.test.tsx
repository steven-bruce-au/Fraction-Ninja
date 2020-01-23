import React from 'react';
import ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import { FractionState } from './FractionState';
import FractionInput from './FractionInput';
import util from 'util';


it('render FractionInput', () => {

  const fractionState = new FractionState(1,3);

  // Mock functions
  const handleNumeratorChange = jest.fn();
  const handleDenominatorChange = jest.fn();

  const component = renderer.create(<FractionInput  fractionState={fractionState} 
                   numeratorUpdated={handleNumeratorChange} 
                   denominatorUpdated={handleDenominatorChange} /> );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // console.log(util.inspect(tree, {showHidden: false, depth: null}));

  // expect neither our numerator or denominator to be updated
  expect(handleNumeratorChange).not.toHaveBeenCalled();
  expect(handleDenominatorChange).not.toHaveBeenCalled();

});

it('decrement numerator', () => {

  const fractionState = new FractionState(1,3);

  const handleNumeratorChange = jest.fn();
  const handleDenominatorChange = jest.fn();

  const component = renderer.create(<FractionInput  fractionState={fractionState} 
                   numeratorUpdated={handleNumeratorChange} 
                   denominatorUpdated={handleDenominatorChange} /> );

  let tree = component.toJSON();

  // console.log(util.inspect(tree, {showHidden: false, depth: null}));

  // get fraction row
  const numerator  = tree!.children![0] as renderer.ReactTestRendererJSON;
  // get decrement button
  const decrement  = numerator!.children![0] as renderer.ReactTestRendererJSON;

  // click on decrement numerator button
  decrement.props.onClick();

  // expect our numerator to been reduced to zero but no the denominator
  expect(handleNumeratorChange).toHaveBeenCalledWith(0);
  expect(handleDenominatorChange).not.toHaveBeenCalled();

});


it('increment numerator', () => {

  const fractionState = new FractionState(1,3);

  const handleNumeratorChange = jest.fn();
  const handleDenominatorChange = jest.fn();

  const component = renderer.create(<FractionInput  fractionState={fractionState} 
                   numeratorUpdated={handleNumeratorChange} 
                   denominatorUpdated={handleDenominatorChange} /> );

  let tree = component.toJSON();

  // console.log(util.inspect(tree, {showHidden: false, depth: null}));

  // get fraction row
  const numerator  = tree!.children![0] as renderer.ReactTestRendererJSON;
  // get increment button
  const increment  = numerator!.children![2] as renderer.ReactTestRendererJSON;

  // click on increment numerator button
  increment.props.onClick();

  // expect our numerator to been reduced to zero but no the denominator
  expect(handleNumeratorChange).toHaveBeenCalledWith(2);
  expect(handleDenominatorChange).not.toHaveBeenCalled();

});


it('decrement denominator', () => {

  const fractionState = new FractionState(1,3);

  const handleNumeratorChange = jest.fn();
  const handleDenominatorChange = jest.fn();

  const component = renderer.create(<FractionInput  fractionState={fractionState} 
                   numeratorUpdated={handleNumeratorChange} 
                   denominatorUpdated={handleDenominatorChange} /> );

  let tree = component.toJSON();

  // console.log(util.inspect(tree, {showHidden: false, depth: null}));

  // get fraction row
  const denominator  = tree!.children![1] as renderer.ReactTestRendererJSON;
  // get decrement button
  const decrement  = denominator!.children![0] as renderer.ReactTestRendererJSON;

  // click on decrement numerator button
  decrement.props.onClick();

  // expect our numerator to been reduced to zero but no the denominator
  expect(handleNumeratorChange).not.toHaveBeenCalled();
  expect(handleDenominatorChange).toHaveBeenCalledWith(2);

});


it('increment denominator', () => {

  const fractionState = new FractionState(1,3);

  const handleNumeratorChange = jest.fn();
  const handleDenominatorChange = jest.fn();

  const component = renderer.create(<FractionInput  fractionState={fractionState} 
                   numeratorUpdated={handleNumeratorChange} 
                   denominatorUpdated={handleDenominatorChange} /> );

  let tree = component.toJSON();

  // console.log(util.inspect(tree, {showHidden: false, depth: null}));

  // get fraction row
  const denominator  = tree!.children![1] as renderer.ReactTestRendererJSON;
  // get increment button
  const increment  = denominator!.children![2] as renderer.ReactTestRendererJSON;

  // click on increment numerator button
  increment.props.onClick();

  // expect our numerator to been reduced to zero but no the denominator
   expect(handleNumeratorChange).not.toHaveBeenCalled();
  expect(handleDenominatorChange).toHaveBeenCalledWith(4);

});
