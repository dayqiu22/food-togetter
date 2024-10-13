import { View, SafeAreaView } from 'react-native'
import React from 'react'

const MainContent = ({ children }: any) => {
  return (
    <View className='flex-1'>
      <SafeAreaView className='flex-1 px-1 justify-between my-20 mx-5'>
        {children}
      </SafeAreaView>
    </View>
  )
}

export default MainContent