import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'
import CustomButton from '@/components/CustomButton'
import MainContent from '@/components/MainContent'
import { useRouter } from 'expo-router'

const App = () => {
  const router = useRouter()

  return (
    <MainContent>
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
    </MainContent>
  )
}

export default App