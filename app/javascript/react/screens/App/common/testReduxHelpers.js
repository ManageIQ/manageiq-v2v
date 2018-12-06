import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createStore, applyMiddleware, combineReducers } from 'redux';

const middlewares = [thunk, promiseMiddleware()];

export const generateStore = (reducers, initialState) =>
  createStore(combineReducers(reducers), initialState, applyMiddleware(...middlewares));
