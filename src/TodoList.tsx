import React from "react";
import {TasksType} from "./App";

type Props = {
    tasks: TasksType;
    removeTask: (id: number) => void;
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}