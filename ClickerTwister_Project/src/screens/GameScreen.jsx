import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { useGameState } from '../hooks/useGameState';
import { ClickerButton } from '../components/ClickerButton';
import { UpgradesList } from '../components/UpgradesList';
import { DarkTwistCutscene } from '../components/DarkTwistCutscene';
import { AchievementPopup } from '../components/AchievementPopup';
import { ACHIEVEMENTS } from '../data/achievements';
import { useSound } from '../hooks/useSound';

export const GameScreen = () => {
    const {
        points,
        totalClicks,
        clickPower,
        passiveIncome,
        upgradeLevels,
        unlockedAchievements,
        isHardcoreMode,
        showDarkTwist,
        handleClick,
        purchaseUpgrade,
        enterHardcoreMode,
        escapeHardcoreMode,
        setShowDarkTwist,
    } = useGameState();

    const { playSound } = useSound();

    const [activeTab, setActiveTab] = useState('game');
    const [currentAchievement, setCurrentAchievement] = useState(null);
    const [previousAchievements, setPreviousAchievements] = useState([]);
    const [clickParticles, setClickParticles] = useState([]);

    // Show new achievement notifications
    useEffect(() => {
        const newAchievements = unlockedAchievements.filter(
            id => !previousAchievements.includes(id)
        );

        if (newAchievements.length > 0) {
            const achievement = ACHIEVEMENTS.find(a => a.id === newAchievements[0]);
            if (achievement) {
                setCurrentAchievement(achievement);
                playSound('achievement');
            }
            setPreviousAchievements(unlockedAchievements);
        }
    }, [unlockedAchievements]);

    // Check for hardcore mode escape condition
    useEffect(() => {
        if (isHardcoreMode && points >= 100000000) {
            escapeHardcoreMode();
        }
    }, [isHardcoreMode, points]);

    const onClickButton = () => {
        const value = handleClick();
        playSound('click');

        // Create floating particle effect
        const id = Date.now() + Math.random();
        setClickParticles(prev => [...prev, { id, value }]);
        setTimeout(() => {
            setClickParticles(prev => prev.filter(p => p.id !== id));
        }, 1000);
    };

    const formatNumber = (num) => {
        if (num >= 1000000000) return `${(num / 1000000000).toFixed(2)}B`;
        if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return Math.floor(num).toString();
    };

    const renderGameTab = () => (
        <View style={[styles.gameContainer, isHardcoreMode && styles.hardcoreBackground]}>
            {/* Stats */}
            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={[styles.statLabel, isHardcoreMode && styles.hardcoreText]}>
                        POINTS
                    </Text>
                    <Text style={[styles.statValue, isHardcoreMode && styles.hardcoreText]}>
                        {formatNumber(points)}
                    </Text>
                </View>

                <View style={styles.statRow}>
                    <View style={styles.statBoxSmall}>
                        <Text style={[styles.statLabelSmall, isHardcoreMode && styles.hardcoreText]}>
                            Click Power
                        </Text>
                        <Text style={[styles.statValueSmall, isHardcoreMode && styles.hardcoreText]}>
                            +{formatNumber(clickPower)}
                        </Text>
                    </View>

                    <View style={styles.statBoxSmall}>
                        <Text style={[styles.statLabelSmall, isHardcoreMode && styles.hardcoreText]}>
                            Per Second
                        </Text>
                        <Text style={[styles.statValueSmall, isHardcoreMode && styles.hardcoreText]}>
                            +{formatNumber(passiveIncome)}
                        </Text>
                    </View>
                </View>

                <View style={styles.statBoxSmall}>
                    <Text style={[styles.statLabelSmall, isHardcoreMode && styles.hardcoreText]}>
                        Total Clicks: {formatNumber(totalClicks)}
                    </Text>
                </View>

                {isHardcoreMode && (
                    <View style={styles.hardcoreBanner}>
                        <Text style={styles.hardcoreBannerText}>
                            🔥 HARDCORE MODE 🔥
                        </Text>
                        <Text style={styles.hardcoreGoal}>
                            Reach 100M to escape!
                        </Text>
                    </View>
                )}
            </View>

            {/* Clicker Button */}
            <View style={styles.clickerContainer}>
                <ClickerButton onPress={onClickButton} isHardcoreMode={isHardcoreMode} />

                {/* Floating particles */}
                {clickParticles.map(particle => (
                    <FloatingParticle key={particle.id} value={particle.value} />
                ))}
            </View>

            {/* Quick Stats */}
            <View style={styles.quickStats}>
                <Text style={[styles.quickStatText, isHardcoreMode && styles.hardcoreText]}>
                    🏆 {unlockedAchievements.length}/{ACHIEVEMENTS.length} Achievements
                </Text>
            </View>
        </View>
    );

    const renderUpgradesTab = () => (
        <UpgradesList
            points={points}
            upgradeLevels={upgradeLevels}
            onPurchase={(id) => {
                if (purchaseUpgrade(id)) {
                    playSound('purchase');
                }
            }}
            isHardcoreMode={isHardcoreMode}
        />
    );

    const renderAchievementsTab = () => (
        <View style={styles.achievementsContainer}>
            <Text style={[styles.achievementsTitle, isHardcoreMode && styles.hardcoreText]}>
                ACHIEVEMENTS
            </Text>
            {ACHIEVEMENTS.map(achievement => {
                const isUnlocked = unlockedAchievements.includes(achievement.id);
                const isSecret = achievement.secret && !isUnlocked;

                return (
                    <View
                        key={achievement.id}
                        style={[
                            styles.achievementCard,
                            !isUnlocked && styles.achievementLocked,
                            isHardcoreMode && styles.hardcoreCard,
                        ]}
                    >
                        <Text style={styles.achievementIcon}>
                            {isSecret ? '❓' : achievement.icon}
                        </Text>
                        <View style={styles.achievementInfo}>
                            <Text style={[styles.achievementName, isHardcoreMode && styles.hardcoreText]}>
                                {isSecret ? '???' : achievement.name}
                            </Text>
                            <Text style={styles.achievementDescription}>
                                {isSecret ? 'Secret Achievement' : achievement.description}
                            </Text>
                            {isUnlocked && (
                                <Text style={styles.achievementReward}>
                                    ✓ {achievement.reward}
                                </Text>
                            )}
                        </View>
                    </View>
                );
            })}
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, isHardcoreMode && styles.hardcoreContainer]}>
            <AchievementPopup
                achievement={currentAchievement}
                onComplete={() => setCurrentAchievement(null)}
            />

            <DarkTwistCutscene
                visible={showDarkTwist}
                onContinue={() => {
                    playSound('twist');
                    enterHardcoreMode();
                }}
            />

            {/* Tab Navigation */}
            <View style={styles.tabBar}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'game' && styles.tabActive]}
                    onPress={() => setActiveTab('game')}
                >
                    <Text style={[styles.tabText, activeTab === 'game' && styles.tabTextActive]}>
                        GAME
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'upgrades' && styles.tabActive]}
                    onPress={() => setActiveTab('upgrades')}
                >
                    <Text style={[styles.tabText, activeTab === 'upgrades' && styles.tabTextActive]}>
                        UPGRADES
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'achievements' && styles.tabActive]}
                    onPress={() => setActiveTab('achievements')}
                >
                    <Text style={[styles.tabText, activeTab === 'achievements' && styles.tabTextActive]}>
                        ACHIEVEMENTS
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Content */}
            {activeTab === 'game' && renderGameTab()}
            {activeTab === 'upgrades' && renderUpgradesTab()}
            {activeTab === 'achievements' && renderAchievementsTab()}
        </SafeAreaView>
    );
};

// Floating particle component
const FloatingParticle = ({ value }) => {
    const translateY = new Animated.Value(0);
    const opacity = new Animated.Value(1);

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -100,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.particle,
                {
                    transform: [{ translateY }],
                    opacity,
                },
            ]}
        >
            <Text style={styles.particleText}>+{value}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    hardcoreContainer: {
        backgroundColor: '#0a0000',
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tab: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
    },
    tabActive: {
        borderBottomWidth: 3,
        borderBottomColor: '#4A90E2',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    tabTextActive: {
        color: '#4A90E2',
    },
    gameContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20,
    },
    hardcoreBackground: {
        backgroundColor: '#0a0000',
    },
    statsContainer: {
        width: '100%',
        alignItems: 'center',
    },
    statBox: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        fontWeight: '600',
    },
    statValue: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#4A90E2',
        marginTop: 5,
    },
    statRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    statBoxSmall: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    statLabelSmall: {
        fontSize: 12,
        color: '#666',
    },
    statValueSmall: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A90E2',
        marginTop: 2,
    },
    clickerContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    particle: {
        position: 'absolute',
        top: -50,
    },
    particleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    quickStats: {
        alignItems: 'center',
    },
    quickStatText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
    },
    hardcoreBanner: {
        backgroundColor: '#8B0000',
        borderRadius: 8,
        padding: 15,
        width: '100%',
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#FF0000',
    },
    hardcoreBannerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    hardcoreGoal: {
        fontSize: 14,
        color: '#FFA500',
        textAlign: 'center',
        marginTop: 5,
    },
    hardcoreText: {
        color: '#FF0000',
    },
    achievementsContainer: {
        flex: 1,
        padding: 10,
    },
    achievementsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: '#333',
    },
    achievementCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFD700',
    },
    achievementLocked: {
        opacity: 0.5,
        borderColor: '#ccc',
    },
    hardcoreCard: {
        backgroundColor: '#1a0000',
        borderColor: '#8B0000',
    },
    achievementIcon: {
        fontSize: 40,
        marginRight: 15,
    },
    achievementInfo: {
        flex: 1,
    },
    achievementName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    achievementDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    achievementReward: {
        fontSize: 12,
        color: '#4A90E2',
        marginTop: 4,
        fontWeight: '600',
    },
});
