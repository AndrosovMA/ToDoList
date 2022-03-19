import React, {useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddCircleOutline} from "@mui/icons-material";

type PropsItemForm = {
    addItem: (title: string) => void
}

export function AddItemForm(props: PropsItemForm) {
    const [errorInput, setErrorInput] = useState<null | string>(null);
    const [newTaskTittle, setNewTaskTittle] = useState('');

    const inputTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setErrorInput(null)
        setNewTaskTittle(e.currentTarget.value);
    };
    const addTaskByEnter = (e: any) => {
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
            <TextField
                id="standard-basic"
                label="Add task"
                variant="outlined"
                error={!!errorInput}
                value={newTaskTittle}
                onChange={inputTextHandler}
                onKeyPress={addTaskByEnter}
            />
            <IconButton aria-label="delete" onClick={addTaskByButton}  color="primary" size="small">
                <AddCircleOutline/>
            </IconButton>
            {errorInput && <div className="error_message">tittle is required</div>}
        </div>
    )
}