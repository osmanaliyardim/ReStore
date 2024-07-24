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
    return state;
}

export default counterReducer;