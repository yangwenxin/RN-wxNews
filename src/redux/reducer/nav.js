/**
 * Created by wenxin on 2017/8/3.
 */

import {AppNavigator} from '../../App';


export default function StackReducer(state , action) {
    let nextState;
    switch (action.type) {
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }
    return nextState || state;
}
