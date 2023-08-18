import {useState} from 'react'

function useString(string) {
    const [state, setState] = useState(string);

    const changeString = (newString) => {
        setState(newString)
    }

    return [state, changeString]
}

export default useString