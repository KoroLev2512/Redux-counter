import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from '@redux-devtools/extension';
import {rootReduser} from "./redux/rootReduser";
import {increment, decrement, asyncIncrement, changeTheme} from "./redux/actions";
import {thunk} from "redux-thunk";
import logger from "redux-logger";
import './styles.css'

const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')

// function logger(state) {
//     return function (next) {
//         return function (action) {
//             console.log('action', action)
//             console.log('state', state)
//             return next(action)
//         }
//     }
// }
//
// const store = createStore(
//     rootReduser,
//     compose(
//         applyMiddleware(thunk, logger),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// )

const store = createStore(
    rootReduser,
    composeWithDevTools(
        applyMiddleware(thunk, logger),
    )
)

addBtn.addEventListener('click', () => {
    store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
    store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
    store.dispatch(asyncIncrement())
})

themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light')
        ? 'dark'
        : 'light'
    store.dispatch(changeTheme(newTheme))
})

store.subscribe(()=> {
    const state = store.getState()

    counter.textContent = state.counter;
    document.body.className = state.theme.value;

    [addBtn, subBtn, asyncBtn, themeBtn].forEach(btn => {
        btn.disabled = state.theme.disabled;
    })
})

store.dispatch({type: 'INIT_APPLICATION'})
