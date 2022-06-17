import {ComponentMeta, ComponentStory} from "@storybook/react";
import App from "../app/App";
// import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'App Component',
    component: App,

    // decorators: [ReduxStoreProviderDecorator]

} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App/>

export const AppWithReduxStory = Template.bind({});
AppWithReduxStory.args = {}

