import {combineReducers} from 'redux';

// 导航
import nav from './nav';
// 业务
import theme from './theme';

/**
 * 3.合并reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
export default combineReducers({
  nav: nav,
  theme: theme,
});

// const redu = combineReducers({
//   nav: nav,
//   theme: theme,
// });

// export default redu;
