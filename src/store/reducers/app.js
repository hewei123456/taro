import Taro from '@tarojs/taro';
import { fromJS } from 'immutable';


const initState = {
  keywords: '',
  list: fromJS([]),
};

/* ------------types------------- */
export const ADD_LIST_ITEM = 'ADD_LIST_ITEM';
export const DELETE_LIST_ITEM = 'DELETE_LIST_ITEM';

/* ------------actions------------- */
export const addItem = item => (
  { type: ADD_LIST_ITEM, item }
);

export const deleteItem = index => (
  { type: DELETE_LIST_ITEM, index }
);

/* ------------reducer------------- */
export default (state = initState, action) => {
  const { type } = action;

  switch (type) {
    case ADD_LIST_ITEM:
      const { item } = action;
      state = { ...state, list: state.list.push(item) };
      break;

    case DELETE_LIST_ITEM:
      const { index } = action;
      state = { ...state, list: state.list.delete(index) };
      break;
  }

  return state;
};
