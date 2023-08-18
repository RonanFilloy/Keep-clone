import React, {useState, useContext} from 'react';
import { NotesContext } from '../contexts/NotesContext';
import useString from '../hooks/useString';
import { TextField } from '@mui/material';
import '../styles/CreateNote.css';

function CreateNote() {
    const [newTags, setNewTags] = useState([]);

    const [newTitle, changeTitle] = useString('');
    const [newContent, changeContent] = useString('');
    const [newTag, changeTag] = useString('');

    const {dispatch} = useContext(NotesContext);

    const handleChange = (setter) => (evt) => {
        setter(evt.target.value);
    }

    const addNewTag = (evt) => {
        evt.preventDefault();
        setNewTags([...newTags, newTag]);
        changeTag('');
    }

    const resetValues = () => {
        changeTitle('');
        changeContent('');
        changeTag('');
        setNewTags([]);
    }

    const addNewNote = async (evt) => {
        evt.preventDefault();
        const data = {
            title: newTitle,
            content: newContent,
            archived: false,
            tags: newTags
        }
        fetch('/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                dispatch({type: 'ADD', newNote: result})
            })
            .catch(error => {
                console.log('Error:', error)
            })
            .finally(() => {
                resetValues();
            })
    }

    return (
        <form className='card new-form' autoComplete='off'>
            <div className='card-head new-title'>
                <TextField
                    name='newTitle'
                    placeholder='New title...'
                    margin='normal'
                    value={newTitle}
                    onChange={handleChange(changeTitle)}
                    inputProps={{maxLength: 20}}
                    fullWidth
                />
            </div>
                <div className={`card-body new-content ${!newTitle ? 'no-show' : ''}`}>
                    <textarea
                        name='newContent'
                        value={newContent}
                        onChange={handleChange(changeContent)}
                    />
                </div>
                <div className={`card-footer new-tagform ${!newTitle ? 'no-show' : ''}`}>
                    <div className='new-tags'>
                    <ul>{newTags.map((t, i) => <li key={i}><i className='fas fa-tag' />{t}</li>)}</ul>
                        <TextField
                            name='newTag'
                            className='new-tags-input'
                            placeholder='New tag'
                            value={newTag}
                            onChange={handleChange(changeTag)}
                            inputProps={{ maxLength: 20 }}
                        />
                        <button onClick={addNewTag}>Add</button>
                    </div>
                </div>
                <button className={`new-submit ${!newTitle ? 'no-show' : ''}`} onClick={addNewNote}>Save</button>
        </form>
    )
}

export default CreateNote