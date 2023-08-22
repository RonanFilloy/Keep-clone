const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD':
            return [...state, action.newNote];
        case 'EDIT':
            return state.map(note => {
                if(note.id === action.id) {
                    return {...note, title: action.title, content: action.content}
                } else {
                    return note
                }
            })
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
            return state.map(note => {
                console.log('br1')
                if(note.id === action.id) {
                    console.log('br2')
                    return {...note, archived: action.archived}
                } else {
                    console.log('br3')
                    return note
                }
            })
        default:
            return state
    }
}

export default reducer