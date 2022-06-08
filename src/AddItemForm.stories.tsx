import {AddItemForm} from "./AddItemForm";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";


export default {
    title: 'AddItemForm Component',
    component: AddItemForm,

    argTypes: {
        addItem: {
            description: 'callback'
        }
    }
} as ComponentMeta <typeof AddItemForm>;


const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
AddItemFormStory.args = {
    addItem: action("Button 'add' was pressed inside the form"),
}



// Второй вариант написания
// const callback = action ("Button 'add' was pressed inside the form");
//
// export const AddItemFormBaseExample = () => {
//     return <AddItemForm addItem={callback}/>
//
// }
