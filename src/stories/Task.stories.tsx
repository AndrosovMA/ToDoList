import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Task} from "../features/TodoListsList/TodoList/Task/Task";
//
import {Provider} from "react-redux";
// import {store} from "./state/store";
import {storyBookStore} from "./ReduxStoreProviderDecorator";
// import {v1} from "uuid";
//
// export default {
//     title: 'Task Component',
//     component: Task,
//
//     argTypes: {},
//
// } as ComponentMeta<typeof Task>;
//
const Template: ComponentStory<typeof Task> = (args) => {
    return <Provider store={storyBookStore}>
        <Task {...args} />
    </Provider>
}
//
//
// export const TaskStoryTrue = Template.bind({});
// TaskStoryTrue.args = {
//     idTodoList: '1',
//     idTask: '1-2',
//     isDone: true,
//     title: 'StoryBook'
// }

export const TaskStoryFalse = Template.bind({});
// TaskStoryFalse.args = {
//     idTodoList: '1',
//     idTask: '1-2',
//     isDone: false,
//     title: 'StoryBook'
// }


