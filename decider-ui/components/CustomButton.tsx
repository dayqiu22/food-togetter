import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface ButtonProps {
    onPress: () => void,
    title: string,
    textStyles?: string,
    containerStyles?: string
}

const CustomButton = ({ onPress, title, textStyles = "", containerStyles = ""}: ButtonProps) => {
  return (
    <TouchableOpacity 
        activeOpacity={0.7} 
        className={`bg-black rounded-xl min-h-[70px] justify-center items-center ${containerStyles}`}
        onPress={onPress}
    >
        <Text className={`text-white font-semibold text-lg ${textStyles}`}>
            {title}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButton