import { default as React, ReactElement } from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import App from './App';
import Header from './Header'
import FractionComparator from './FractionComparator'

it('renders the top level components in the application', () => {

const renderer = createRenderer();
renderer.render(<App/>);
const result = renderer.getRenderOutput();

expect(result).toEqual(
	<div className="App">
		<Header/>
		<FractionComparator/>
	</div>);
});
