import React, { useContext, useEffect, useState } from 'react';
import Note from './Note';
import CreateNote from './CreateNote';
import { NotesContext } from '../contexts/NotesContext';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../styles/NoteList.css'

function NoteList() {
    const { isArchived, noteArr, dispatch } = useContext(NotesContext);

    const [tagFilter, setTagFilter] = useState([]);
    const [currFilter, setCurrFilter] = useState('All');

    const [refresh, setRefresh] = useState(false);

    useEffect(
        function fetchNotes() {
            fetch('https://keep-server-x6uo.onrender.com/notes', {method: 'GET'})
                .then(response => response.json())
                .then(data => {
                    data.sort((a, b) => a.title.localeCompare(b.title));
                    if(!isArchived) {
                        const activeNotes = data.filter(n => !n.archived);
                        const uniqueTags = [...new Set(activeNotes.flatMap(note => note.tags))];
                        setTagFilter(uniqueTags);
                        dispatch({type: 'CHOOSE', arr: activeNotes});
                    } else {
                        const archivedNotes = data.filter(n => n.archived);
                        const uniqueTags = [...new Set(archivedNotes.flatMap(note => note.tags))];
                        setTagFilter(uniqueTags);
                        dispatch({type: 'CHOOSE', arr: archivedNotes});
                    }
                    setRefresh(false);
                })
                .catch(error => {
                    console.error('Error fetching notes:', error);
                });
        }, [dispatch, isArchived, refresh]
    );

    const handleFilterChange = (evt) => {
        setCurrFilter(evt.target.value);
    }

    const filteredNotes = noteArr.filter(note => {
        if (currFilter === 'All') {
            return true;
        }
        return note.tags.includes(currFilter);
    });

    return (
        <div className='container'>
            <div className='row'>
                <CreateNote setRefresh={setRefresh} />
                <FormControl fullWidth>
                    <h6>Filter by:</h6>
                    <Select
                        id='tag-filter'
                        value={currFilter}
                        onChange={handleFilterChange}
                        className='filter-select'
                    >
                        <MenuItem value='All'>All</MenuItem>
                        {tagFilter.map((tag, i) => (
                            <MenuItem key={i} value={tag}>{tag}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className='list'>
                    {filteredNotes.map(n => (
                        <Note 
                            key={n.id}
                            id={n.id}
                            title={n.title}
                            content={n.content}
                            archived={n.archived}
                            tags={n.tags}
                            setRefresh={setRefresh}
                            setCurrFilter={setCurrFilter}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NoteList