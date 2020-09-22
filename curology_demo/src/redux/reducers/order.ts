import { ADD_ORDER, ORDER_COMPLETED } from '../actionTypes/orderTypes';

const INITIAL_STATE: any = {
  data: [],
};

function orderReducer(state = INITIAL_STATE, action: any): any {
  switch (action.type) {
    case ADD_ORDER:
    case ORDER_COMPLETED: {
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    }

    default:
      return state;
  }
}

export default orderReducer;
