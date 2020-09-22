import { ADD_ORDER, ORDER_COMPLETED } from '../../actionTypes/orderTypes';

export const addOrder = (data: any) => ({
  payload: data,
  type: ADD_ORDER,
});

export const orderCompleted = (data: any) => ({
  payload: data,
  type: ORDER_COMPLETED,
});

