import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './pages/app';
import Layout from './pages/layout';
import NorFound from './pages/not-found';
import UserPage from './pages/user-page';
import User from './pages/user-page/user';
import Repository from './pages/user-page/repository';
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import registerServiceWorker from './registerServiceWorker';

const __svg__ = {path: './components/icon/**/*.svg', name: 'assets/svg/[hash].sprite.svg'};
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__)



ReactDOM.render(<Router history={browserHistory}>
	<Route component={Layout}>
		<Route path='/' component={App}></Route>
			<IndexRoute component={App} />
			<Route path='/:user' component={User}/>>
			<Route path='repository' component={Repository}></Route>		
		<Route path='*' component={NorFound}></Route>
	</Route>
</Router>, document.getElementById('root'));
registerServiceWorker();
