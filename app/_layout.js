import { Stack } from "expo-router";
import * as Colors from '../src/styles/colors'

export default () => {
    return <Stack
        screenOptions={{
            headerStyle: {
                backgroundColor: Colors.PURPLE
            },
            headerTintColor: Colors.TEXT_IN_PURPLE_BASE,
            headerShadowVisible: false,
            title: ''
        }}
    />
};