import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app';
import Layout from './app/layout';
import NorFound from './app/app-component/not-found';
import User from './app/user-page';
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import registerServiceWorker from './registerServiceWorker';

const __svg__ = {path: './components/icon/**/*.svg', name: 'assets/svg/[hash].sprite.svg'};
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__)

ReactDOM.render(<Router history={browserHistory}>
	<Route component={Layout}>
		<Route path={process.env.PUBLIC_URL} component={App}></Route>
		<IndexRoute component={App} />
		<Route path={`${process.env.PUBLIC_URL}:user`} component={User}></Route>
		<Route path={'*'} component={NorFound}></Route>
	</Route>
</Router>, document.getElementById('root'));
registerServiceWorker();
