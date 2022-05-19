import React, {useCallback, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddCircleOutline} from "@mui/icons-material";

type PropsItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: PropsItemFormType) => {

        const [errorInput, setErrorInput] = useState<null | string>(null);
        const [newTaskTittle, setNewTaskTittle] = useState('');

        const inputTextHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            setNewTaskTittle(e.currentTarget.value);
        }, [setNewTaskTittle]);
        const addTaskByEnter = useCallback((e: React.KeyboardEvent) => {
            if (errorInput !== null) {
                setErrorInput(null)
            }
            if (e.key === 'Enter') {
                if (newTaskTittle.trim() === '') {
                    setErrorInput('error')
                    return
                }
                props.addItem(newTaskTittle.trim());
                setNewTaskTittle('')
            }
        }, [props, errorInput, newTaskTittle]);
        const addTaskByButton = useCallback(() => {
            if (newTaskTittle.trim() === '') {
                setErrorInput('error')
                return
            }
            props.addItem(newTaskTittle.trim());
            setNewTaskTittle('')
        }, [props, newTaskTittle])

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
                <IconButton aria-label="delete" onClick={addTaskByButton} color="primary" size="small">
                    <AddCircleOutline/>
                </IconButton>
                {errorInput && <div className="error_message">tittle is required</div>}
            </div>
        )
    }
)


