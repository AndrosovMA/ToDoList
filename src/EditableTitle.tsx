import React, {ChangeEvent, useState} from "react";
import {Input} from "@mui/material";

type EditableTitleProps = {
    title: string
    editableTitleValue: (value: string) => void
}

export const EditableTitle = React.memo((props: EditableTitleProps) => {
    console.log('Editable Title')

    const [editMode, setEditMode] = useState(false);
    const [editTitle, setEditTitle] = useState('');

    const turnOnSpanHandler = () => {
        setEditMode(!editMode);
        setEditTitle(props.title);
    }
    const turnOfInputHandler = () => {
        setEditMode(!editMode);
        props.editableTitleValue(editTitle);
    }
    const turnOfByEnterInputHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            turnOfInputHandler();
        }
    }
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let changedValue = e.currentTarget.value;
        setEditTitle(changedValue);
    }

    return (
        <>
            {editMode
                ? <Input value={editTitle}
                         onBlur={turnOfInputHandler}
                         autoFocus={true}
                         onChange={inputHandler}
                         onKeyPress={turnOfByEnterInputHandler}/>
                : <span onDoubleClick={turnOnSpanHandler}>{props.title}</span>}
        </>
    )
});