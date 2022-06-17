import React, {ChangeEvent, useState} from "react";
import {Input} from "@mui/material";

type EditableTitleProps = {
    title: string
    editableTitleValue: (value: string) => void
}

export const EditableTitle = React.memo(({title, editableTitleValue}: EditableTitleProps) => {


    const [editMode, setEditMode] = useState(false);
    const [editTitle, setEditTitle] = useState('');

    const turnOnSpanHandler = () => {
        setEditMode(!editMode);
        setEditTitle(title);
    }

    const turnOffInputHandler = () => {
        setEditMode(!editMode);
        editableTitleValue(editTitle);
    }
    const turnOffInputHandlerByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            turnOffInputHandler();
        }
    }
    const inputHandlerText = (e: ChangeEvent<HTMLInputElement>) => {
        let changedValue = e.currentTarget.value;
        setEditTitle(changedValue);
    }

    return (
        <>
            {editMode
                ? <Input value={editTitle}
                         onBlur={turnOffInputHandler}
                         autoFocus={true}
                         onChange={inputHandlerText}
                         onKeyPress={turnOffInputHandlerByEnter}/>
                : <span onDoubleClick={turnOnSpanHandler}>{title}</span>}
        </>
    )
});