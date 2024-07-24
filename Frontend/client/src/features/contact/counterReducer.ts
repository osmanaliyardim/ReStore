export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 21,
    title: 'Redux counter'
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const counterReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                ...state,
                data: state.data + 1
            }
        case DECREMENT_COUNTER:
            return {
                ...state,
                data: state.data - 1
            }
        default:
            return state;
    }
}

export default counterReducer;