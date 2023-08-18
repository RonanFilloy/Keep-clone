import React, { useContext } from 'react';
import { NotesContext } from '../contexts/NotesContext';
import '../styles/Navbar.css';

function Navbar() {
    const { isArchived, toggleArchived } = useContext(NotesContext);

    const goToArchived = () => {
        if (!isArchived) {
            toggleArchived();
        }
    }

    const goToActive = () => {
        if (isArchived) {
            toggleArchived();
        }
    }

    return (
        <div>
            <div className='navbar'>
                <h4 onClick={goToActive}>My Notes</h4>
                <h6 onClick={goToArchived}>See Archived</h6>
            </div>
            <hr />
        </div>
    )
}

export default Navbar