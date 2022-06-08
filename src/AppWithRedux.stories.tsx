import {ComponentMeta, ComponentStory} from "@storybook/react";

import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import AppWithRedux from "./AppWithRedux";

export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,

    decorators: [ReduxStoreProviderDecorator]

} as ComponentMeta<typeof AppWithRedux>;

const Template: ComponentStory<typeof AppWithRedux> = () => <AppWithRedux/>

export const AppWithReduxStory = Template.bind({});
AppWithReduxStory.args = {}

