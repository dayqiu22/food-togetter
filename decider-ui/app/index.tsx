import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'

const App = () => {
  return (
    <View className='flex-1'>
      <SafeAreaView className='flex-1 px-1 justify-between my-20'>
        <View>
          <Text className='text-center text-black font-bold text-4xl'>FoodTogetter</Text>
          <Text className='text-center text-black font-normal text-2xl mt-3'>Decisiveness clicks away!</Text>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default App