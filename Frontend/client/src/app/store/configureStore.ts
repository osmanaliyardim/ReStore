import { createStore } from "redux"
import counterReducer from "../../features/contact/counterReducer"

const configureStore = () => {
    return createStore(counterReducer)
}

export default configureStore;