import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

export const AchievementPopup = ({ achievement, onComplete }) => {
    const slideAnim = useRef(new Animated.Value(-100)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (achievement) {
            Animated.sequence([
                // Slide in
                Animated.parallel([
                    Animated.spring(slideAnim, {
                        toValue: 0,
                        useNativeDriver: true,
                        friction: 6,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]),
                // Hold
                Animated.delay(3000),
                // Slide out
                Animated.parallel([
                    Animated.timing(slideAnim, {
                        toValue: -100,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]),
            ]).start(() => {
                if (onComplete) onComplete();
            });
        }
    }, [achievement]);

    if (!achievement) return null;

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateY: slideAnim }],
                    opacity: opacityAnim,
                },
            ]}
        >
            <View style={styles.content}>
                <Text style={styles.icon}>{achievement.icon}</Text>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Achievement Unlocked!</Text>
                    <Text style={styles.name}>{achievement.name}</Text>
                    <Text style={styles.description}>{achievement.description}</Text>
                    <Text style={styles.reward}>+{achievement.reward}</Text>
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 10,
        right: 10,
        zIndex: 1000,
    },
    content: {
        backgroundColor: '#FFD700',
        borderRadius: 12,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        borderWidth: 3,
        borderColor: '#FFA500',
    },
    icon: {
        fontSize: 50,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 12,
        color: '#8B4513',
        fontWeight: '600',
        marginBottom: 2,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 2,
    },
    description: {
        fontSize: 14,
        color: '#333',
        marginBottom: 4,
    },
    reward: {
        fontSize: 12,
        color: '#4A90E2',
        fontWeight: 'bold',
    },
});
