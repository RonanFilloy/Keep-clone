import React, {memo} from 'react';
import FullNote from './FullNote';
import useToggle from '../hooks/useToggle';
import '../styles/Note.css';

function Note(props) {
    const {id, title, content, archived, tags, setCurrFilter, setRefresh } = props;

    const [open, toggleOpen] = useToggle(false);

    let tagList = tags.map((t, i) => 
        <li key={i}>
            <i className='fas fa-tag' />{t}
        </li>
    );

    return (
        <div className='col-lg-4 col-md-6 col-12'>
            {!open ? 
                <div className='card note' onClick={toggleOpen}>
                    <div className='card-head'>
                        <h5>{title}</h5>
                    </div>
                    <div className='card-body'>
                        <p>{content}</p>
                    </div>
                    <div className='card-footer'>
                        <ul>
                            {tagList}
                        </ul>
                        
                    </div>
                </div>
            : 
                <FullNote 
                    id={id}
                    title={title}
                    content={content}
                    archived={archived}
                    tags={tags}
                    open={open}
                    setRefresh={setRefresh}
                    toggleOpen={toggleOpen}
                    setCurrFilter={setCurrFilter}
                />
            }
        </div>
    )
}

export default memo(Note)