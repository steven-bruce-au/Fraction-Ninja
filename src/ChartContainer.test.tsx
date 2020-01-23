import React from 'react';
import * as renderer from 'react-test-renderer';
import ChartContainer from './ChartContainer';
import { FractionState } from './FractionState';
import util from 'util';


class EmptyParent implements renderer.TestRendererOptions {

   // override default implementation
   createNodeMock(element: ReactElement): any {
    const doc = document.implementation.createHTMLDocument();
    return { parentElement: doc.body };
   }
}

it('render chart container with two whole charts and a 1/3 pie chart in green', () => {

  const fractionState = new FractionState(1,3);

  const component = renderer.create(<ChartContainer equal='true' maxCharts='3' fractionState='${fractionState}'/> , new EmptyParent());

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();


});

