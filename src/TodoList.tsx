import React, {useState} from "react";
import {FilterValueType, TasksType} from "./App";
import {v1} from "uuid";

type Props = {
    tasks: TasksType;
    removeTask: (id: string) => void;
    changeFilter: (value: FilterValueType) => void;
    addTask: (tittle: string) => void;
}

export function TodoList(props: Props) {
    const [newTaskTittle, setNewTaskTittle] = useState('');

    const inputTextHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setNewTaskTittle(e.currentTarget.value);
    };
    const addTaskByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(newTaskTittle);
            setNewTaskTittle('')
        }
    };
    const addTaskByButton = () => {
        props.addTask(newTaskTittle);
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
                       onChange={inputTextHandler}
                       onKeyPress={addTaskByEnter}/>
                <button onClick={addTaskByButton}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((el) => {
                        const onRemoveTask = () => {
                            props.removeTask(el.id)
                        }

                        return <li key={v1()}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={onRemoveTask}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={allClickHandler}>All</button>
                <button onClick={activeClickHandler}>Active</button>
                <button onClick={completedClickHandler}>Completed</button>
            </div>
        </div>
    )
}