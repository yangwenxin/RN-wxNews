/**
 * Created by wenxin on 2017/9/6.
 */
import * as api from "../../http/api";
import * as types from "./Types";
import Toast from "../../utils/Toast";

function fetchMoreDataSuccess(dataSource) {
    return {
        type: types.COMMON_MORE_DATA_SUCCESS,
        dataSource: dataSource,
    }
}

function fetchSuccess(dataSource) {
    return {
        type: types.COMMON_DATA_SUCCESS,
        dataSource: dataSource,
    };
}

function fetchFailure() {
    return {
        type: types.COMMON_DATA_FAILURE,
    };
}

function fetchRequest() {
    return {
        type: types.COMMON_DATA_REQUEST,
    };
}

function fetchMoreRequest() {
    return {
        type: types.COMMON_MORE_REQUEST,
    };
}

function resume() {
    return {
        type: types.STATE_RESUME
    };
}

export function stateResume() {
    return (dispatch) => {
        dispatch(resume());
    }
}

export function fetchCommonData(isMoreData, title, page) {

    if (page > 10) {
        Toast("没有更多数据了~");
        return;
    }

    return (dispatch) => {

        if (isMoreData) {
            dispatch(fetchMoreRequest());
        } else {
            dispatch(fetchRequest());
        }

        api.getCommonData(title, page).then(res => {
            if (!res.error)
                if (isMoreData) {
                    dispatch(fetchMoreDataSuccess(res.results));
                } else {
                    dispatch(fetchSuccess(res.results));
                }
        })
            .catch(error => {
                dispatch(fetchFailure());
                Toast('获取数据失败');
            });

    }

}


