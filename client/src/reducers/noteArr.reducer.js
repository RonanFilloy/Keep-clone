const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD':
            return [...state, action.newNote];
        case 'DELETE':
            return state.filter(note => note.id !== action.id);
        case 'CHOOSE': 
            return action.arr
        case 'CHANGE TAGS':
            return state.map(note => {
                if(note.id === action.id) {
                    return {...note, tags: action.newTags}
                } else {
                    return note
                }
            })
        case 'ARCHIVE':
            return state.map(note => (note.id === action.id ? { ...note, archived: action.archived } : note));
        default:
            return state
    }
}

export default reducer