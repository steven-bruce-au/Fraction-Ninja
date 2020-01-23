import React from 'react';
import * as renderer from 'react-test-renderer';
import PieFraction from './PieFraction';
import util from 'util';


class EmptyParent implements renderer.TestRendererOptions {

   // override default implementation
   createNodeMock(element: ReactElement): any {
    const doc = document.implementation.createHTMLDocument();
    return { parentElement: doc.body };
   }
}

it('render 2/3 pie chart in red', () => {

  const component = renderer.create(<PieFraction numerator='2' denominator='3' equal='false'/> , new EmptyParent());

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();


});

