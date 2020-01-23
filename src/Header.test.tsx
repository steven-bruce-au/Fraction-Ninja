import { default as React, ReactElement } from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import Header from './Header'

it('renders the header', () => {

const renderer = createRenderer();
renderer.render(<Header/>);
const result = renderer.getRenderOutput();

expect(result).toEqual(
	<div className="header">
		<div className="title">Fraction Ninja</div>
		<div className="description">Learn about fractions and decimals</div>
	</div>
	);
});
