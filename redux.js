const redux = require('redux')

const initState = {
    counter: 0
}

//reducer
const reducer = (state = initState, action) => {
    if(action.type === 'ADD'){
        return {
            counter: state.counter + 1
        }
    }

    if(action.type === 'SUB'){
        return {
            counter: state.counter - 1
        }
    }

    if(action.type === 'ADD_NUM'){
        return {
            counter: state.counter + action.value
        }
    }

    return state
}

//store
const store = redux.createStore(reducer);
// console.log("1", store.getState())

store.subscribe(() => {
    console.log('Subscribe ' , store.getState())
})

//action
const addCounter = {
    type: 'ADD'
}

store.dispatch(addCounter)
// console.log("2", store.getState())


store.dispatch({type: 'SUB'})
// console.log("3", store.getState())

store.dispatch({type: 'ADD_NUM', value: 10})
// console.log("4", store.getState())