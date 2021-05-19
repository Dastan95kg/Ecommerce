const reducer = (state = false, action) => {
    switch (action.type) {
        case 'COD':
            return action.payload
        default:
            return state
    }
}

export default reducer