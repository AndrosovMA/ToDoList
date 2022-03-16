import React, {ChangeEvent} from "react";
import {FilterValueType, TasksType} from "./App";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

type Props = {
    id: string
    taskName: string
    tasks: TasksType
    removeTask: (idList: string, idTask: string) => void
    changeFilter: (value: FilterValueType, id: string) => void
    addTask: (tittle: string, id: string) => void
    changeStatusTask: (idList: string, idTask: string, isDone: boolean) => void
    filter: FilterValueType
    deleteTodoList: (id: string) => void
}

export function TodoList(props: Props) {

    const allClickHandler = () => {
        props.changeFilter('All', props.id)
    };
    const activeClickHandler = () => {
        props.changeFilter('Active', props.id)
    };
    const completedClickHandler = () => {
        props.changeFilter('Completed', props.id)
    };
    const handlerDeleteTodoList = () => {
        props.deleteTodoList(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    } // обертка над props.addTask что бы не передавать id

    return (
        <div>
            <h3>{props.taskName}
                <button onClick={handlerDeleteTodoList}>X</button>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                {
                    props.tasks.map((el) => {
                        const onRemoveTask = () => {
                            props.removeTask(props.id, el.id)
                        }
                        const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatusTask(props.id, el.id, e.currentTarget.checked);
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


