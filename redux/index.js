/**
 * store提供的方法：
 *  1. getState：获取当前state
 *  2. dispatch：触发行为
 *  3. subscribe：订阅事件
 */
 function createStore(reducers, initState) {
     //historyState可用作时光机
    let state = initState, historyState = [{action:'init', state: initState}], listeners = [];
    
    let getState = () => state;

    let subscribe = (event) => {
        listeners.push(event);
        /**
         * 注册事件的同时，获取事件句柄
         * let fnHandle = fnsubscribe(fn)
         * 删除对应注册事件
         * fnHandle();
         *  */
        return () => {
            listeners = listeners.filter(eventItem => eventItem != event);
        }
    }

    let dispatch = (action) => {
        //reducer根据action对state做改变，返回全新的state
        state = reducers(state, action);
        historyState.push({action, state})
        //state改变的情况下，触发事件
        listeners.forEach(listener => listener());
    }
    return {
        dispatch,
        getState,
        subscribe,
        getHistoryState: () => historyState
    }
}
/**
 * 对action做处理，返回全新的state
 */
function reducers(state, action){
    switch(action){
        case 'add':
            return state += 1;
        case 'minus':
            return state -=1;
        default:
            return 0;
    }
}

/**
 * 中间件（注意中间件的约定格式）
 */
function middleware1({dispatch, getState}) {
    return function(next) {
        return function(action) {
            console.log(`【日志】当前state值：${getState()}，执行${action}`);
            next(action);
            console.log(`【日志】操作完成后，state值：${getState()}`);
        }
    }
}
function middleware2({dispatch, getState}) {
    return function(next) {
        return function(action) {
            console.log(`>>>>>>>>>>>>>>>>>>`);
            next(action);
            console.log(`<<<<<<<<<<<<<<<<<<`);
        }
    }
}
//中间件组合
let compose = (middlewares) => {
    return middlewares.reduce((mw1, mw2) => (...args) => mw1(mw2(...args)));
}
//将中间件绑定到
let applyMiddleware = middlewares => (createStore) => (...args) => {
    let store = createStore(...args);
    let dispatch = store.dispatch;
    let params = {
        dispatch,
        getState: store.getState
    };
    middlewares = middlewares.map(mw => mw(params));
    //组合中间件，增强dispatch
    dispatch = compose(middlewares)(dispatch);
    //返回增强后饿dispatch
    return Object.assign(store, {dispatch});
}


/**
 * 对外暴露：
 *  1. createStore: 产生store
 *  2. applyMiddleware：中间件处理
 */
let initState = 1;
let store = applyMiddleware([middleware2, middleware1])(createStore)(reducers, initState);
