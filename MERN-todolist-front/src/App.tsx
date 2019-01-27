import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import './App.scss';
import Todo from './Todo/Todo'
import { TodoStore } from './stores/TodoStore'
import DevTools from 'mobx-react-devtools'

class App extends Component {
	render() {
		return (
			<Provider TodoStore={TodoStore}>
				<div className="App">
					<DevTools />
					<Todo />
				</div>
			</Provider>
		);
	}
}

export default App;
