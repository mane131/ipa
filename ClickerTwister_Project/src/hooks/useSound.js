import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

export const useSound = () => {
    const [sounds, setSounds] = useState({});

    const soundFiles = {
        click: require('../../assets/sounds/click.mp3'),
        purchase: require('../../assets/sounds/purchase.mp3'),
        achievement: require('../../assets/sounds/achievement.mp3'),
        twist: require('../../assets/sounds/dark-twist.mp3'),
    };

    const playSound = async (soundName) => {
        try {
            const { sound } = await Audio.Sound.createAsync(soundFiles[soundName]);
            await sound.playAsync();

            // Automatically unload sound after playing
            sound.setOnPlaybackStatusUpdate(async (status) => {
                if (status.didJustFinish) {
                    await sound.unloadAsync();
                }
            });
        } catch (error) {
            console.log(`Sound ${soundName} not found or failed to play. Make sure files exist in assets/sounds/`);
        }
    };

    return { playSound };
};
