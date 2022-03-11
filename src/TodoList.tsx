import React, {ChangeEvent, useState} from "react";
import {FilterValueType, TasksType} from "./App";
import {v1} from "uuid";

type Props = {
    tasks: TasksType;
    removeTask: (id: string) => void;
    changeFilter: (value: FilterValueType) => void;
    addTask: (tittle: string) => void;
    changeStatusTask: (id: string, isDone: boolean) => void
    filter: string
}

export function TodoList(props: Props) {
    const [newTaskTittle, setNewTaskTittle] = useState('');
    const [errorInput, setErrorInput] = useState<null | string>(null);

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
            props.addTask(newTaskTittle.trim());
            setNewTaskTittle('')
        }
    };
    const addTaskByButton = () => {
        if (newTaskTittle.trim() === '') {
            setErrorInput('error')
            return
        }
        props.addTask(newTaskTittle.trim());
        setNewTaskTittle('')
    }
    const allClickHandler = () => {
        props.changeFilter('All')
    };
    const activeClickHandler = () => {
        props.changeFilter('Active')
    };
    const completedClickHandler = () => {
        props.changeFilter('Completed')
    };

    return (
        <div>
            <h3>What to learn</h3>
            <div>
                <input placeholder='указать новую задачу' value={newTaskTittle}
                       className={errorInput ? errorInput : ''}
                       onChange={inputTextHandler}
                       onKeyPress={addTaskByEnter}/>
                <button onClick={addTaskByButton}>+</button>
                {errorInput && <div className="error_message">tittle is required</div>}
            </div>
            <ul>
                {
                    props.tasks.map((el) => {
                        const onRemoveTask = () => {
                            props.removeTask(el.id)
                        }
                        const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatusTask(el.id, e.currentTarget.checked);
                        }

                        return <li key={v1()}>
                            <input type="checkbox" checked={el.isDone} onChange={onChangeCheckbox}/>
                            <span>{el.title}</span>
                            <button onClick={onRemoveTask}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'All' ? 'active_filter' : ''}
                        onClick={allClickHandler}>All
                </button>
                <button className={props.filter === 'Active' ? 'active_filter' : ''}
                        onClick={activeClickHandler}>Active
                </button>
                <button className={props.filter === 'Completed' ? 'active_filter' : ''}
                        onClick={completedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}