/* ============
* Vuex Store
* ============
*
* The store of the application
*
* http://vuex.vuejs.org/en/index.html
*/

import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import * as actions from './actions';

// Modules

import authentication from './modules/authentication';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	/**
	* Assign the actions to the store
	*/
	actions,

	/**
	* Assign the modules to the store
	*/
	modules: {
		authentication,
	},

	/**
	* If strict mode should be enabled
	*/
	strict: debug,

	/**
	* Plugins used in the store
	*/
	plugins: debug ? [createLogger()] : [],
});
