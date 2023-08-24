import React, { useContext } from 'react';
import { NotesContext } from '../contexts/NotesContext';
import useString from '../hooks/useString';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { TextField } from '@mui/material';
import '../styles/FullNote.css';

function FullNote(props) {
    const { id, title, content, archived, tags, open, toggleOpen, setCurrFilter, setRefresh } = props;

    const [noteTitle, changeNoteTitle] = useString(title);
    const [noteContent, changeNoteContent] = useString(content);
    const [newTag, changeNewTag] = useString('');

    const { dispatch, isArchived } = useContext(NotesContext);

    const handleChange = (setter) => (evt) => {
        setter(evt.target.value);
    }

    const handleEdit = async () => {
        dispatch({type: 'EDIT', id: id, title: noteTitle, content: noteContent});
        toggleOpen();
        setRefresh(true);
        try {
            const response = await fetch(`https://keep-server-x6uo.onrender.com/notes/${id}/edit`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    updatedTitle: noteTitle,
                    updatedContent: noteContent
                })
            });
            if(!response.ok) {
                throw new Error('Failed to update note');
            }
        } catch(error) {
            console.error('Error updating note: ', error);
        }
    }

    const handleArchive = async () => {
        dispatch({ type: 'ARCHIVE', id: id, archived: !archived });
        setCurrFilter('All');
        setRefresh(true);
        toggleOpen();
        try {
            const response = await fetch(`https://keep-server-x6uo.onrender.com/notes/${id}/archive`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    archivedStatus: !archived
                })
            });
            if(!response.ok) {
                throw new Error('Failed to update note status')
            }
        } catch(error) {
            console.error('Error updating note status: ', error);
        }
    }

    const addNewTag = async () => {
        dispatch({ type: 'CHANGE TAGS', id: id, newTags: [...tags, newTag] });
        setRefresh(true);
        try {
            const response = await fetch(`https://keep-server-x6uo.onrender.com/notes/${id}/tags`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    tagArr: [...tags, newTag]
                })
            });
            if (!response.ok) {
                throw new Error('failed to add tag');
            }
        } catch (error) {
            console.error('Error adding new tag: ', error);
        }
        changeNewTag('');
    }

    const handleDeleteTag = (t) => async () => {
        const updatedTags = tags.filter(tag => tag !== t)
        dispatch({type: 'CHANGE TAGS', id: id, newTags: updatedTags});
        setRefresh(true);
        try {
            const response = await fetch(`https://keep-server-x6uo.onrender.com/notes/${props.id}/tags`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    tagArr: updatedTags
                })
            });
            if (!response.ok) {
                throw new Error('failed to update tags');
            }
        } catch (error) {
            console.error('Error updating  tag: ', error);
        }
    }

    const handleDeleteNote = async () => {
        dispatch({type: 'DELETE', id: id});
        setCurrFilter('All');
        setRefresh(true);
        try {
            const response = await fetch(`https://keep-server-x6uo.onrender.com/notes/${id}`, {method: 'DELETE'});
            if(!response.ok) {
                throw new Error('failed to delete note');
            }
        } catch(error) {
            console.error('Error deleting note: ', error);
        }
    }

    let tagList = tags.map((t, i) =>
        <li key={i}>
            <i className='fas fa-tag' />{t}<button className='remove-tag' onClick={handleDeleteTag(t)}><i className='fas fa-xmark' /></button>
        </li>
    );

    return (
        <Dialog
            open={open}
            onClose={handleEdit}
            maxWidth="md"
            fullWidth
        >
            <div className='note-form' autoComplete='off'>
                <DialogContent>
                    <TextField
                        className='full-title'
                        name='noteTitle'
                        value={noteTitle}
                        onChange={handleChange(changeNoteTitle)}
                        inputProps={{ maxLength: 20 }}
                        margin='normal'
                        fullWidth
                    />
                    <textarea
                        className='full-content'
                        name='noteContent'
                        value={noteContent}
                        onChange={handleChange(changeNoteContent)}
                    />
                    <ul className='full-tags'>
                        {tagList}
                    </ul>
                </DialogContent>
                <hr />
                <div className='add-tags'>
                    <TextField
                        type='text'
                        name='newTag'
                        placeholder='New tag'
                        value={newTag}
                        onChange={handleChange(changeNewTag)}
                        inputProps={{ maxLength: 20 }}
                    />
                    <button
                        onClick={addNewTag}
                        disabled={!newTag.trim()}
                        className={`${!newTag.trim() ? 'muted-button' : ''}`}
                    >
                        Add
                    </button>
                </div>
                <DialogActions className='note-buttons'>
                    <button onClick={handleArchive}>{!isArchived ? <i className='fas fa-box' /> : <i className='fas fa-box-open'/>}</button>
                    <button onClick={handleDeleteNote}><i className='fas fa-trash' /></button>
                </DialogActions>
            </div>
        </Dialog>
    )
}

export default FullNote