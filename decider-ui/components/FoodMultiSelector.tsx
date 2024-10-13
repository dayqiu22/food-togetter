import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { CuisineType } from '@/mock-data/categories';

export default function FoodMultiSelector() {
    const [expanded, setExpanded] = useState(true);
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

    const toggleCuisine = (cuisine: string) => {
        setSelectedCuisines(prevSelected => 
            prevSelected.includes(cuisine) 
                ? prevSelected.filter(item => item !== cuisine) 
                : [...prevSelected, cuisine]
        );
    };

    return (
        <View>
            <TouchableOpacity>
                <Text style={styles.headerText}>
                    SELECT PREFERRED FOOD TYPES
                </Text>
            </TouchableOpacity>
            {expanded && (
                <ScrollView 
                    style={styles.scrollView}
                >
                {Object.values(CuisineType).map((item) => (
                    <TouchableOpacity 
                        key={item.toLowerCase()} 
                        onPress={() => toggleCuisine(item)} 
                        style={{
                            padding: 15,
                            marginBottom: 5,
                            borderRadius: 20,
                            backgroundColor: selectedCuisines.includes(item) ? '#FFBA00' : '#FFFFFF',
                            paddingBottom: 10,
                            paddingTop: 10,
                        }}
                    >
                        <Text>{item.toUpperCase()}</Text>
                    </TouchableOpacity>
                ))}
                </ScrollView>
            )}
        </View>
    );
    
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        borderRadius: 20,
        backgroundColor: 'white',
        paddingBottom: 50,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    }
});