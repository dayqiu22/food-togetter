import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { PriceRange } from '@/mock-data/categories';

export default function PriceMultiSelector() {
    const [expanded, setExpanded] = useState(true);
    const [selectedPrices, setSelectedPrices] = useState<string[]>([]);

    const togglePrices = (price: string) => {
        setSelectedPrices(prevSelected => 
            prevSelected.includes(price) 
                ? prevSelected.filter(item => item !== price) 
                : [...prevSelected, price]
        );
    };

    return (
        <View>
            <TouchableOpacity>
                <Text style={styles.headerText}>
                    SELECT PREFERRED PRICE RANGE
                </Text>
            </TouchableOpacity>
            {expanded && (
                <ScrollView 
                    style={styles.scrollView}
                >
                {Object.values(PriceRange).map((item) => (
                    <TouchableOpacity 
                        key={item.toLowerCase()} 
                        onPress={() => togglePrices(item)} 
                        style={{
                            padding: 15,
                            marginBottom: 5,
                            borderRadius: 20,
                            backgroundColor: selectedPrices.includes(item) ? '#FFBA00' : '#FFFFFF',
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
        flexGrow: 0,
        borderRadius: 20,
        backgroundColor: 'white',
        paddingBottom: 0,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    }
});