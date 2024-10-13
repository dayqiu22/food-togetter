import { View, Text, FlatList, Pressable, SafeAreaView } from 'react-native'
import React from 'react'
import { styled } from 'nativewind';


const profile = () => {
  const menu = [
    {
      id: '1',
      title: 'Profile',
    },
    {
      id: '2',
      title: 'Account Settings',
    },{
      id: '3',
      title: 'Help',
    },
    {
      id: '4',
      title: 'Log Out',
    },
  ];

  return (
    <View className='flex-1'>
      <SafeAreaView className='flex-1 px-1 justify-between my-20 mx-5'>
        <FlatList
          data={menu}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => console.log(item.title)} 
              className='h-10 my-3 mx-3 rounded-md overflow-hidden'
            >
              <Text className='font-bold text-2xl'>
                {item.title}
              </Text>
            </Pressable>
          )}
        >
        </FlatList>
      </SafeAreaView>
    </View>
  )
}

export default profile