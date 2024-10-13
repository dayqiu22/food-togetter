import { Tabs } from "expo-router"
import { styled } from 'nativewind'

const TabsLayout = () => {
    return (
    <Tabs screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'blue',
    }}>
        <Tabs.Screen name="groups" options={{tabBarLabel: 'Groups'}}/>
        <Tabs.Screen name="profile" options={{tabBarLabel: 'Profile'}}/>
    </Tabs>
    )

}

export default TabsLayout 