import { default as React, ReactElement } from 'react';
import util from 'util';
import { createRenderer } from 'react-test-renderer/shallow';
import * as renderer from 'react-test-renderer';

import { FractionState } from './FractionState';
import FractionComparator from './FractionComparator';
import FractionInput from './FractionInput';
import ChartContainer from './ChartContainer';

class EmptyParent implements renderer.TestRendererOptions {

   // override default implementation
   createNodeMock(element: ReactElement): any {
    const doc = document.implementation.createHTMLDocument();
    return { parentElement: doc.body };
   }
}

it('render FractionComparator', () => {

  const component = renderer.create(<FractionComparator/>, new EmptyParent());

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // console.log(util.inspect(tree, {showHidden: false, depth: null}));

});

function anonymous(numerator: number) : void {}


/** For some reason this doesn't work */
it.skip('render FractionComparator Shallow', () => {

const shallowRenderer = createRenderer();
shallowRenderer.render(<FractionComparator />);
const result = shallowRenderer.getRenderOutput();

console.log(util.inspect(result, {showHidden: false, depth: null}));
console.log(util.inspect(<div className="mainContainer">
  <div className="column">
       <FractionInput fractionState={new FractionState()} numeratorUpdated={ anonymous } denominatorUpdated={ anonymous }/>
       <ChartContainer equal={true} fractionState={ new FractionState() } maxCharts={1} />
       <div className="decimal">1</div>
  </div>
  <div className="column">
       <FractionInput fractionState={new FractionState()} numeratorUpdated={ anonymous } denominatorUpdated={ anonymous }/>
       <ChartContainer equal={true} fractionState={ new FractionState() } maxCharts={1} />
       <div className="decimal">1</div>
  </div>
</div>, {showHidden: false, depth: null}));




expect(result.type).toBe('div');
expect(result).toEqual(<div className="mainContainer">
  <div className="column">
       <FractionInput fractionState={ new FractionState() } numeratorUpdated={ anonymous } denominatorUpdated={ anonymous }/>
       <ChartContainer equal={true} fractionState={ new FractionState() } maxCharts={1} />
       <div className="decimal">1</div>
  </div>
  <div className="column">
       <FractionInput fractionState={ new FractionState() } numeratorUpdated={ anonymous } denominatorUpdated={ anonymous }/>
       <ChartContainer equal={true} fractionState={ new FractionState() } maxCharts={1} />
       <div className="decimal">1</div>
  </div>
</div>);

shallowRenderer.unmount()

});