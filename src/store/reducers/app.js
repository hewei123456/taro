import Taro from '@tarojs/taro';
import { fromJS } from 'immutable';


const initState = {
  keywords: '',
  list: fromJS([]),
};

/* ------------types------------- */
export const KEYWORDS = 'KEYWORDS';
export const ADD_LIST_ITEM = 'ADD_LIST_ITEM';
export const DELETE_LIST_ITEM = 'DELETE_LIST_ITEM';

/* ------------actions------------- */
export const setKeywords = keywords => (
  { type: KEYWORDS, keywords }
);

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
    /* ------------关键字------------- */
    case KEYWORDS:
      const { keywords } = action;
      state = { ...state, keywords };
      break;

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
