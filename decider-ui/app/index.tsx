import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'
import CustomButton from '@/components/CustomButton'
import { useRouter } from 'expo-router'

const App = () => {
  const router = useRouter()

  return (
    <View className='flex-1'>
      <SafeAreaView className='flex-1 px-1 justify-between my-20 mx-5'>
        <View>
          <Text className='text-center text-black font-bold text-4xl'>FoodTogetter</Text>
          <Text className='text-center text-black font-normal text-2xl mt-3'>Decisiveness clicks away!</Text>
        </View>
        <View>
          <CustomButton 
            onPress={() => router.push('/groups')}
            title='Sign In'
            containerStyles='bg-[#0C3B2E]'
          />
        </View>
      </SafeAreaView>
    </View>
  )
}

export default App