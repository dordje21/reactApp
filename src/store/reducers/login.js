const initialState = {
    token: null
}

export default function loginReducer(state = initialState, action) {

    switch (action.type) {
        case "outLogin":
            return {
                token: null
            }
        default:
            return state
    }
}