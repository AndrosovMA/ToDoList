import React, {useState} from "react";

type PropsItemForm = {
    addItem: (title: string) => void
}

export function AddItemForm(props: PropsItemForm) {
    const [errorInput, setErrorInput] = useState<null | string>(null);
    const [newTaskTittle, setNewTaskTittle] = useState('');

    const inputTextHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setErrorInput(null)
        setNewTaskTittle(e.currentTarget.value);
    };
    const addTaskByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (newTaskTittle.trim() === '') {
            setErrorInput('error')
            return
        }
        if (e.key === 'Enter') {
            props.addItem(newTaskTittle.trim());
            setNewTaskTittle('')
        }
    };
    const addTaskByButton = () => {
        if (newTaskTittle.trim() === '') {
            setErrorInput('error')
            return
        }
        props.addItem(newTaskTittle.trim());
        setNewTaskTittle('')
    }

    return (
        <div>
            <input placeholder='указать новую задачу' value={newTaskTittle}
                   className={errorInput ? errorInput : ''}
                   onChange={inputTextHandler}
                   onKeyPress={addTaskByEnter}/>
            <button onClick={addTaskByButton}>+</button>
            {errorInput && <div className="error_message">tittle is required</div>}
        </div>
    )
}