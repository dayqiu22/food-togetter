import { Tabs } from "expo-router"

const TabsLayo  = () => {
    return (
    <Tabs>
        <Tabs.Screen name="groups" options={{tabBarLabel: 'Groups'}}/>
        <Tabs.Screen name="preferences" options={{tabBarLabel: 'Profile'}}/>
    </Tabs>
    )

}