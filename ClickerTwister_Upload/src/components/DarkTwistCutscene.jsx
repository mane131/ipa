import React, { useEffect, useRef } from 'react';
import { View, Text, Modal, StyleSheet, Animated, TouchableOpacity } from 'react-native';

export const DarkTwistCutscene = ({ visible, onContinue }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const glitchAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            // Fade in animation
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                // Glitch effect
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(glitchAnim, {
                            toValue: 1,
                            duration: 100,
                            useNativeDriver: true,
                        }),
                        Animated.timing(glitchAnim, {
                            toValue: 0,
                            duration: 100,
                            useNativeDriver: true,
                        }),
                    ]),
                    { iterations: 5 }
                ),
            ]).start();
        } else {
            fadeAnim.setValue(0);
            glitchAnim.setValue(0);
        }
    }, [visible]);

    const glitchTranslate = glitchAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 10],
    });

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onContinue}
        >
            <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
                <View style={styles.glitchContainer}>
                    <Animated.View style={{ transform: [{ translateX: glitchTranslate }] }}>
                        <Text style={styles.title}>THE TRUTH</Text>

                        <View style={styles.messageContainer}>
                            <Text style={styles.message}>
                                You've clicked enough...
                            </Text>
                            <Text style={styles.message}>
                                But they want MORE.
                            </Text>
                            <Text style={[styles.message, styles.highlight]}>
                                Every click generated ad revenue.
                            </Text>
                            <Text style={[styles.message, styles.highlight]}>
                                Every second you spent here was profit.
                            </Text>
                            <Text style={styles.message}>
                                You thought you were playing.
                            </Text>
                            <Text style={styles.message}>
                                You were working for free.
                            </Text>
                        </View>

                        <View style={styles.choiceContainer}>
                            <Text style={styles.choiceText}>
                                Now... will you keep going?
                            </Text>
                            <Text style={styles.choiceSubtext}>
                                Or accept the truth and WORK HARDER?
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.continueButton}
                            onPress={onContinue}
                        >
                            <Text style={styles.continueText}>
                                ENTER HARDCORE MODE
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    glitchContainer: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FF0000',
        textAlign: 'center',
        marginBottom: 40,
        textShadowColor: '#FF0000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    messageContainer: {
        marginBottom: 40,
    },
    message: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 15,
        lineHeight: 28,
    },
    highlight: {
        color: '#FF0000',
        fontWeight: 'bold',
        fontSize: 22,
    },
    choiceContainer: {
        marginTop: 30,
        marginBottom: 40,
    },
    choiceText: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    choiceSubtext: {
        fontSize: 18,
        color: '#FF6666',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    continueButton: {
        backgroundColor: '#8B0000',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FF0000',
        shadowColor: '#FF0000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    continueText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});
