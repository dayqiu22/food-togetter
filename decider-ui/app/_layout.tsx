import { Stack } from "expo-router";
import { styled } from 'nativewind'
import { Provider } from 'react-redux'
import { store } from "@/state/store";


export default function RootLayout() {

    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                <Stack.Screen name="index" options={{headerShown: false}}/>
                <Stack.Screen name="new-group" options={{headerShown: false}}/>
                <Stack.Screen name="set-preferences" options={{headerShown: false}}/>
            </Stack>
        </Provider>
    )
}