import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import { Frame } from './components/Frame/Frame';
import { onLoad } from './core/onLoad';

function App() {
	
	useEffect(() => {
		onLoad();
	}, []);

	return (
		<Frame>
			<div>
				Hello World
			</div>
		</Frame>
	);
}

export default App;
