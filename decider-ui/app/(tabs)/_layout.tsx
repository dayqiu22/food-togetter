import { Tabs, useRouter } from "expo-router"
import { styled } from 'nativewind'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CustomButton from "@/components/CustomButton";
import { View } from "react-native";

const TabsLayout = () => {
    const router = useRouter()

    return (
    <>
        <View className="items-center z-50 top-[90%]">
            <CustomButton 
                onPress={() => router.push('/new-group')}
                title='+'
                containerStyles="w-[15%] justify-center items-center bg-[#0C3B2E]"
            />
        </View>

        <View className="items-center z-10 top-[50%]">
            <CustomButton 
                onPress={() => router.push('/set-preferences')}
                title='ADD YOUR PREFERENCES'
                containerStyles="w-[70%] justify-center items-center bg-[#0C3B2E]"
            />
        </View>

        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#0C3B2E',
        }}>
            <Tabs.Screen 
                name="groups" 
                options={{
                    tabBarLabel: 'Groups',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="lightbulb-group" size={24} color={color} />
                    )
                }}
            />
            <Tabs.Screen 
                name="profile" 
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="account-settings" size={24} color={color} />
                    )
                }}
            />
        </Tabs>
    </>
    )

}

export default TabsLayout 