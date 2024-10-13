import { Tabs } from "expo-router"

const TabsLayout  = () => {
    return (
    <Tabs screenOptions={{
        headerShown: false
    }}>
        <Tabs.Screen name="groups" options={{tabBarLabel: 'Groups'}}/>
        <Tabs.Screen name="profile" options={{tabBarLabel: 'Profile'}}/>
    </Tabs>
    )

}