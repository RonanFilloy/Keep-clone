import { useState } from 'react';

function useToggle(val) {
    const [state, setstate] = useState(val);

    const toggleState = () => {
        setstate(!state);
    }
    return [state, toggleState];
}

export default useToggle