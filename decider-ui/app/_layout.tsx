import { Stack } from "expo-router";
import { styled } from 'nativewind'

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="new-group" options={{headerShown: false}}/>
            <Stack.Screen name="set-preferences" options={{headerShown: false}}/>
        </Stack>
    )
}