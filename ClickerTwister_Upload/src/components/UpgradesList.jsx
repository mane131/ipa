import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { UPGRADES, calculateUpgradeCost } from '../data/upgrades';

export const UpgradesList = ({ points, upgradeLevels, onPurchase, isHardcoreMode }) => {
    const formatNumber = (num) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={[styles.title, isHardcoreMode && styles.hardcoreText]}>
                UPGRADES
            </Text>

            {UPGRADES.map(upgrade => {
                const currentLevel = upgradeLevels[upgrade.id] || 0;
                const cost = calculateUpgradeCost(upgrade, currentLevel) * (isHardcoreMode ? 10 : 1);
                const canAfford = points >= cost;
                const isMaxed = currentLevel >= upgrade.maxLevel;

                return (
                    <TouchableOpacity
                        key={upgrade.id}
                        style={[
                            styles.upgradeCard,
                            !canAfford && styles.upgradeCardDisabled,
                            isMaxed && styles.upgradeCardMaxed,
                            isHardcoreMode && styles.hardcoreCard,
                        ]}
                        onPress={() => onPurchase(upgrade.id)}
                        disabled={!canAfford || isMaxed}
                    >
                        <View style={styles.upgradeHeader}>
                            <Text style={styles.upgradeIcon}>{upgrade.icon}</Text>
                            <View style={styles.upgradeInfo}>
                                <Text style={[styles.upgradeName, isHardcoreMode && styles.hardcoreText]}>
                                    {upgrade.name}
                                </Text>
                                <Text style={styles.upgradeDescription}>
                                    {upgrade.description}
                                </Text>
                                {currentLevel > 0 && (
                                    <Text style={styles.upgradeLevel}>
                                        Level: {currentLevel}{isMaxed ? ' (MAX)' : ''}
                                    </Text>
                                )}
                            </View>
                        </View>

                        <View style={styles.upgradeCost}>
                            {isMaxed ? (
                                <Text style={styles.maxedText}>MAXED</Text>
                            ) : (
                                <>
                                    <Text style={[styles.costLabel, isHardcoreMode && styles.hardcoreText]}>
                                        Cost:
                                    </Text>
                                    <Text style={[
                                        styles.costValue,
                                        canAfford ? styles.costAffordable : styles.costExpensive,
                                        isHardcoreMode && styles.hardcoreText
                                    ]}>
                                        {formatNumber(cost)}
                                    </Text>
                                </>
                            )}
                        </View>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: '#333',
    },
    upgradeCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 2,
        borderColor: '#4A90E2',
    },
    upgradeCardDisabled: {
        opacity: 0.5,
        borderColor: '#ccc',
    },
    upgradeCardMaxed: {
        backgroundColor: '#f0f0f0',
        borderColor: '#FFD700',
    },
    hardcoreCard: {
        backgroundColor: '#1a0000',
        borderColor: '#8B0000',
    },
    upgradeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    upgradeIcon: {
        fontSize: 40,
        marginRight: 15,
    },
    upgradeInfo: {
        flex: 1,
    },
    upgradeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    upgradeDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    upgradeLevel: {
        fontSize: 12,
        color: '#4A90E2',
        marginTop: 4,
        fontWeight: '600',
    },
    upgradeCost: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    costLabel: {
        fontSize: 14,
        color: '#666',
    },
    costValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    costAffordable: {
        color: '#4CAF50',
    },
    costExpensive: {
        color: '#F44336',
    },
    maxedText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFD700',
        textAlign: 'center',
        width: '100%',
    },
    hardcoreText: {
        color: '#FF0000',
    },
});
