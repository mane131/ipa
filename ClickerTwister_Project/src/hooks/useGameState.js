import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UPGRADES, calculateUpgradeCost } from '../data/upgrades';
import { checkAchievements, calculateAchievementBonuses } from '../data/achievements';

const SAVE_KEY = '@clicker_game_save';

export const useGameState = () => {
    const [points, setPoints] = useState(0);
    const [totalClicks, setTotalClicks] = useState(0);
    const [totalPointsEarned, setTotalPointsEarned] = useState(0);
    const [upgradeLevels, setUpgradeLevels] = useState({});
    const [unlockedAchievements, setUnlockedAchievements] = useState([]);
    const [isHardcoreMode, setIsHardcoreMode] = useState(false);
    const [hardcoreMultiplier, setHardcoreMultiplier] = useState(1);
    const [showDarkTwist, setShowDarkTwist] = useState(false);
    const [darkTwistTriggered, setDarkTwistTriggered] = useState(false);
    const [hardcoreEscaped, setHardcoreEscaped] = useState(false);

    // Click tracking for speed achievements
    const [recentClicks, setRecentClicks] = useState([]);
    const [maxClicksPer10Sec, setMaxClicksPer10Sec] = useState(0);

    // Calculate current stats
    const calculateClickPower = useCallback(() => {
        let power = 1;

        // Add power from upgrades
        UPGRADES.filter(u => u.type === 'power').forEach(upgrade => {
            const level = upgradeLevels[upgrade.id] || 0;
            power += upgrade.clickPowerBonus * level;
        });

        // Apply achievement bonuses
        const bonuses = calculateAchievementBonuses(unlockedAchievements);
        power *= bonuses.clickMultiplier;

        // Apply global multipliers from upgrades
        UPGRADES.filter(u => u.type === 'multiplier').forEach(upgrade => {
            const level = upgradeLevels[upgrade.id] || 0;
            if (level > 0) {
                power *= upgrade.globalMultiplier;
            }
        });

        power *= bonuses.globalMultiplier;
        power *= isHardcoreMode ? hardcoreMultiplier : 1;

        return Math.floor(power);
    }, [upgradeLevels, unlockedAchievements, isHardcoreMode, hardcoreMultiplier]);

    const calculatePassiveIncome = useCallback(() => {
        let income = 0;

        // Add income from auto-clicker upgrades
        UPGRADES.filter(u => u.type === 'auto').forEach(upgrade => {
            const level = upgradeLevels[upgrade.id] || 0;
            income += upgrade.incomePerSecond * level;
        });

        // Apply achievement bonuses
        const bonuses = calculateAchievementBonuses(unlockedAchievements);
        income *= bonuses.passiveMultiplier;

        // Apply global multipliers
        UPGRADES.filter(u => u.type === 'multiplier').forEach(upgrade => {
            const level = upgradeLevels[upgrade.id] || 0;
            if (level > 0) {
                income *= upgrade.globalMultiplier;
            }
        });

        income *= bonuses.globalMultiplier;
        income *= isHardcoreMode ? hardcoreMultiplier : 1;

        return income;
    }, [upgradeLevels, unlockedAchievements, isHardcoreMode, hardcoreMultiplier]);

    // Handle click
    const handleClick = useCallback(() => {
        const clickValue = calculateClickPower();
        setPoints(p => p + clickValue);
        setTotalClicks(c => c + 1);
        setTotalPointsEarned(t => t + clickValue);

        // Track click for speed achievements
        const now = Date.now();
        setRecentClicks(prev => {
            const updated = [...prev, now].filter(time => now - time < 10000);
            if (updated.length > maxClicksPer10Sec) {
                setMaxClicksPer10Sec(updated.length);
            }
            return updated;
        });

        return clickValue;
    }, [calculateClickPower, maxClicksPer10Sec]);

    // Purchase upgrade
    const purchaseUpgrade = useCallback((upgradeId) => {
        const upgrade = UPGRADES.find(u => u.id === upgradeId);
        if (!upgrade) return false;

        const currentLevel = upgradeLevels[upgradeId] || 0;

        // Check max level
        if (currentLevel >= upgrade.maxLevel) return false;

        const cost = calculateUpgradeCost(upgrade, currentLevel);

        if (points >= cost) {
            setPoints(p => p - cost);
            setUpgradeLevels(prev => ({
                ...prev,
                [upgradeId]: currentLevel + 1
            }));

            // Check for dark twist trigger
            if (upgrade.triggersDarkTwist && currentLevel === 0) {
                setShowDarkTwist(true);
                setDarkTwistTriggered(true);
            }

            return true;
        }

        return false;
    }, [points, upgradeLevels]);

    // Enter hardcore mode
    const enterHardcoreMode = useCallback(() => {
        const keepPoints = Math.floor(points * 0.1);
        setPoints(keepPoints);
        setUpgradeLevels({});
        setIsHardcoreMode(true);
        setHardcoreMultiplier(10);
        setShowDarkTwist(false);
    }, [points]);

    // Escape hardcore mode
    const escapeHardcoreMode = useCallback(() => {
        setHardcoreEscaped(true);
        // Could show end screen here
    }, []);

    // Passive income tick
    useEffect(() => {
        const interval = setInterval(() => {
            const income = calculatePassiveIncome();
            if (income > 0) {
                setPoints(p => p + income);
                setTotalPointsEarned(t => t + income);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [calculatePassiveIncome]);

    // Check achievements
    useEffect(() => {
        const stats = {
            totalClicks,
            totalPointsEarned,
            maxClicksPer10Sec,
            totalUpgradesPurchased: Object.values(upgradeLevels).reduce((a, b) => a + b, 0),
            hasMaxedUpgrade: Object.entries(upgradeLevels).some(([id, level]) => {
                const upgrade = UPGRADES.find(u => u.id === parseInt(id));
                return upgrade && level >= upgrade.maxLevel;
            }),
            currentPassiveIncome: calculatePassiveIncome(),
            darkTwistTriggered,
            isHardcoreMode,
            hardcoreEscaped
        };

        const newAchievements = checkAchievements(stats, unlockedAchievements);
        if (newAchievements.length > 0) {
            setUnlockedAchievements(prev => [
                ...prev,
                ...newAchievements.map(a => a.id)
            ]);
            // Could trigger achievement notification here
        }
    }, [
        totalClicks,
        totalPointsEarned,
        maxClicksPer10Sec,
        upgradeLevels,
        calculatePassiveIncome,
        darkTwistTriggered,
        isHardcoreMode,
        hardcoreEscaped,
        unlockedAchievements
    ]);

    // Save game
    const saveGame = useCallback(async () => {
        try {
            const saveData = {
                points,
                totalClicks,
                totalPointsEarned,
                upgradeLevels,
                unlockedAchievements,
                isHardcoreMode,
                hardcoreMultiplier,
                darkTwistTriggered,
                hardcoreEscaped,
                maxClicksPer10Sec
            };
            await AsyncStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
        } catch (error) {
            console.error('Failed to save game:', error);
        }
    }, [
        points,
        totalClicks,
        totalPointsEarned,
        upgradeLevels,
        unlockedAchievements,
        isHardcoreMode,
        hardcoreMultiplier,
        darkTwistTriggered,
        hardcoreEscaped,
        maxClicksPer10Sec
    ]);

    // Load game
    const loadGame = useCallback(async () => {
        try {
            const saveData = await AsyncStorage.getItem(SAVE_KEY);
            if (saveData) {
                const data = JSON.parse(saveData);
                setPoints(data.points || 0);
                setTotalClicks(data.totalClicks || 0);
                setTotalPointsEarned(data.totalPointsEarned || 0);
                setUpgradeLevels(data.upgradeLevels || {});
                setUnlockedAchievements(data.unlockedAchievements || []);
                setIsHardcoreMode(data.isHardcoreMode || false);
                setHardcoreMultiplier(data.hardcoreMultiplier || 1);
                setDarkTwistTriggered(data.darkTwistTriggered || false);
                setHardcoreEscaped(data.hardcoreEscaped || false);
                setMaxClicksPer10Sec(data.maxClicksPer10Sec || 0);
            }
        } catch (error) {
            console.error('Failed to load game:', error);
        }
    }, []);

    // Auto-save every 5 seconds
    useEffect(() => {
        const interval = setInterval(saveGame, 5000);
        return () => clearInterval(interval);
    }, [saveGame]);

    // Load on mount
    useEffect(() => {
        loadGame();
    }, [loadGame]);

    return {
        points,
        totalClicks,
        totalPointsEarned,
        upgradeLevels,
        unlockedAchievements,
        isHardcoreMode,
        hardcoreMultiplier,
        showDarkTwist,
        darkTwistTriggered,
        hardcoreEscaped,
        maxClicksPer10Sec,
        clickPower: calculateClickPower(),
        passiveIncome: calculatePassiveIncome(),
        handleClick,
        purchaseUpgrade,
        enterHardcoreMode,
        escapeHardcoreMode,
        saveGame,
        loadGame,
        setShowDarkTwist
    };
};
