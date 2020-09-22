export interface OrderData {
    qty: number;
    firstName: string;
    lastName: string;
}

export interface OrderState {
    data: UserData[];
}

export interface OrderAction {
    type: string;
    payload: any;
}

export type OrderTypes = OrderAction;