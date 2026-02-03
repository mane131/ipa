import React, { useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Image } from 'react-native';
import * as Haptics from 'expo-haptics';

export const ClickerButton = ({ onPress, isHardcoreMode }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    const handlePress = () => {
        // Haptic feedback
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        // Scale animation
        Animated.sequence([
            Animated.parallel([
                Animated.timing(scaleAnim, {
                    toValue: 0.9,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 50,
                    useNativeDriver: true,
                }),
            ]),
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 3,
                    tension: 40,
                    useNativeDriver: true,
                }),
                Animated.spring(rotateAnim, {
                    toValue: 0,
                    friction: 3,
                    tension: 40,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();

        onPress();
    };

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '5deg'],
    });

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
            <Animated.View
                style={[
                    styles.container,
                    {
                        transform: [{ scale: scaleAnim }, { rotate }],
                    },
                    isHardcoreMode && styles.hardcoreContainer,
                ]}
            >
                <Image
                    source={isHardcoreMode
                        ? require('../../assets/images/hardcore.gif')
                        : require('../../assets/images/clicker.gif')}
                    style={styles.gif}
                />
                {isHardcoreMode && <View style={styles.hardcoreOverlay} />}

            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
        overflow: 'hidden',
    },
    hardcoreContainer: {
        backgroundColor: '#000',
        borderWidth: 4,
        borderColor: '#F00',
    },
    gif: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    hardcoreOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 0, 0, 0.4)',
    },
});
