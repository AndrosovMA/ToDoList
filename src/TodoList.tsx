import React from "react";
import {FilterValueType, TasksType} from "./App";

type Props = {
    tasks: TasksType;
    removeTask: (id: number) => void;
    changeFilter: (value:FilterValueType) => void;
}

export function TodoList(props: Props) {

    return (
        <div>
            <h3>What to learn</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((el) => {
                        return <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={ () => {props.removeTask(el.id)} } >x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={ () => {props.changeFilter('All')} }>All</button>
                <button onClick={ () => {props.changeFilter('Active')} }>Active</button>
                <button onClick={ () => {props.changeFilter('Completed')} }>Completed</button>
            </div>
        </div>
    )
}