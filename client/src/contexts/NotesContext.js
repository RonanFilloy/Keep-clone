import React, { createContext, useReducer } from 'react';
import useToggle from '../hooks/useToggle';
import noteArrReducer from '../reducers/noteArr.reducer';

const NotesContext = createContext();

function NotesProvider(props) {
    const [isArchived, toggleArchived] = useToggle(false);
    const [noteArr, dispatch] = useReducer(noteArrReducer, []);

    return (
        <NotesContext.Provider value={{ isArchived, toggleArchived, noteArr, dispatch }}>
            {props.children}
        </NotesContext.Provider>
    )
}

export { NotesContext, NotesProvider }