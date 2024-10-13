import { View, Text, FlatList, Pressable, SafeAreaView } from 'react-native'
import React from 'react'
import { styled } from 'nativewind';
import MainContent from '@/components/MainContent';


const Profile = () => {
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
    <MainContent>
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
    </MainContent>
  )
}

export default Profile