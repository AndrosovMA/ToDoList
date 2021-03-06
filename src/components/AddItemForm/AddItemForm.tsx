import React, {useCallback, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddCircleOutline} from "@mui/icons-material";

type PropsItemFormType = {
    addItem: (title: string) => void
    labelName: string
}

export const AddItemForm = React.memo(({addItem, labelName}: PropsItemFormType) => {
        const [errorInput, setErrorInput] = useState<null | string>(null);
        const [newTaskTittle, setNewTaskTittle] = useState('');

        const inputTextHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            setNewTaskTittle(e.currentTarget.value);
        }, [setNewTaskTittle]);

        const addItemByEnter = useCallback((e: React.KeyboardEvent) => {
            if (errorInput !== null) {
                setErrorInput(null)
            }
            if (e.key === 'Enter') {
                if (newTaskTittle.trim() === '') {
                    setErrorInput('error')
                    return
                }
                addItem(newTaskTittle.trim());
                setNewTaskTittle('')
            }
        }, [addItem, errorInput, newTaskTittle]);

        const addItemByButton = useCallback(() => {
            if (newTaskTittle.trim() === '') {
                setErrorInput('error')
                return
            }
            addItem(newTaskTittle.trim());
            setNewTaskTittle('')
        }, [addItem, newTaskTittle])

        return (
            <div>
                <TextField
                    id="standard-basic"
                    label={`Add ${labelName}`}
                    variant="outlined"
                    error={!!errorInput}
                    value={newTaskTittle}
                    onChange={inputTextHandler}
                    onKeyPress={addItemByEnter}
                />
                <IconButton aria-label="delete" onClick={addItemByButton} color="primary" size="small">
                    <AddCircleOutline/>
                </IconButton>
                {errorInput && <div className="error_message">tittle is required</div>}
            </div>
        )
    }
)


