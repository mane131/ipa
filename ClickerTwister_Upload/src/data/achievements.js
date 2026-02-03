// Achievement definitions with unlock conditions and bonuses

export const ACHIEVEMENTS = [
    // CLICK MILESTONES
    {
        id: "clicks_100",
        name: "First Steps",
        description: "Click 100 times",
        condition: (stats) => stats.totalClicks >= 100,
        reward: "1.05x click power",
        bonus: { clickMultiplier: 1.05 },
        icon: "🐣"
    },
    {
        id: "clicks_1k",
        name: "Getting Started",
        description: "Click 1,000 times",
        condition: (stats) => stats.totalClicks >= 1000,
        reward: "1.1x click power",
        bonus: { clickMultiplier: 1.1 },
        icon: "🐥"
    },
    {
        id: "clicks_10k",
        name: "Click Veteran",
        description: "Click 10,000 times",
        condition: (stats) => stats.totalClicks >= 10000,
        reward: "1.15x click power",
        bonus: { clickMultiplier: 1.15 },
        icon: "🦅"
    },
    {
        id: "clicks_100k",
        name: "Click Master",
        description: "Click 100,000 times",
        condition: (stats) => stats.totalClicks >= 100000,
        reward: "1.25x click power",
        bonus: { clickMultiplier: 1.25 },
        icon: "👑"
    },
    {
        id: "clicks_1m",
        name: "Transcendent Clicker",
        description: "Click 1,000,000 times",
        condition: (stats) => stats.totalClicks >= 1000000,
        reward: "1.5x click power",
        bonus: { clickMultiplier: 1.5 },
        icon: "🌟"
    },

    // POINTS MILESTONES
    {
        id: "points_1k",
        name: "First Fortune",
        description: "Earn 1,000 total points",
        condition: (stats) => stats.totalPointsEarned >= 1000,
        reward: "1.05x all income",
        bonus: { globalMultiplier: 1.05 },
        icon: "💰"
    },
    {
        id: "points_10k",
        name: "Wealth Builder",
        description: "Earn 10,000 total points",
        condition: (stats) => stats.totalPointsEarned >= 10000,
        reward: "1.1x all income",
        bonus: { globalMultiplier: 1.1 },
        icon: "💎"
    },
    {
        id: "points_100k",
        name: "Millionaire Mindset",
        description: "Earn 100,000 total points",
        condition: (stats) => stats.totalPointsEarned >= 100000,
        reward: "1.15x all income",
        bonus: { globalMultiplier: 1.15 },
        icon: "🏆"
    },
    {
        id: "points_1m",
        name: "Tycoon",
        description: "Earn 1,000,000 total points",
        condition: (stats) => stats.totalPointsEarned >= 1000000,
        reward: "1.25x all income",
        bonus: { globalMultiplier: 1.25 },
        icon: "🎩"
    },
    {
        id: "points_10m",
        name: "Empire Builder",
        description: "Earn 10,000,000 total points",
        condition: (stats) => stats.totalPointsEarned >= 10000000,
        reward: "1.5x all income",
        bonus: { globalMultiplier: 1.5 },
        icon: "🏰"
    },

    // SPEED ACHIEVEMENTS
    {
        id: "speed_demon",
        name: "Speed Demon",
        description: "Click 100 times in 10 seconds",
        condition: (stats) => stats.maxClicksPer10Sec >= 100,
        reward: "1.1x click power",
        bonus: { clickMultiplier: 1.1 },
        icon: "⚡"
    },
    {
        id: "lightning_fingers",
        name: "Lightning Fingers",
        description: "Click 200 times in 10 seconds",
        condition: (stats) => stats.maxClicksPer10Sec >= 200,
        reward: "1.2x click power",
        bonus: { clickMultiplier: 1.2 },
        icon: "⚡⚡"
    },

    // UPGRADE ACHIEVEMENTS
    {
        id: "first_upgrade",
        name: "Progress!",
        description: "Purchase your first upgrade",
        condition: (stats) => stats.totalUpgradesPurchased >= 1,
        reward: "1.05x all income",
        bonus: { globalMultiplier: 1.05 },
        icon: "📈"
    },
    {
        id: "upgrade_collector",
        name: "Upgrade Collector",
        description: "Purchase 10 upgrades",
        condition: (stats) => stats.totalUpgradesPurchased >= 10,
        reward: "1.1x all income",
        bonus: { globalMultiplier: 1.1 },
        icon: "📊"
    },
    {
        id: "completionist",
        name: "Completionist",
        description: "Max out any upgrade",
        condition: (stats) => stats.hasMaxedUpgrade,
        reward: "1.15x all income",
        bonus: { globalMultiplier: 1.15 },
        icon: "✅"
    },

    // EFFICIENCY ACHIEVEMENTS
    {
        id: "passive_master",
        name: "Passive Master",
        description: "Reach 1,000/sec passive income",
        condition: (stats) => stats.currentPassiveIncome >= 1000,
        reward: "1.2x passive income",
        bonus: { passiveMultiplier: 1.2 },
        icon: "🔄"
    },
    {
        id: "idle_tycoon",
        name: "Idle Tycoon",
        description: "Reach 10,000/sec passive income",
        condition: (stats) => stats.currentPassiveIncome >= 10000,
        reward: "1.5x passive income",
        bonus: { passiveMultiplier: 1.5 },
        icon: "💤"
    },

    // SECRET/STORY ACHIEVEMENTS
    {
        id: "the_truth",
        name: "The Truth",
        description: "Discover the dark truth...",
        condition: (stats) => stats.darkTwistTriggered,
        reward: "2x all income (permanent)",
        bonus: { globalMultiplier: 2 },
        icon: "👁️",
        secret: true
    },
    {
        id: "hardcore_survivor",
        name: "Hardcore Survivor",
        description: "Enter Hardcore Mode",
        condition: (stats) => stats.isHardcoreMode,
        reward: "3x all income (permanent)",
        bonus: { globalMultiplier: 3 },
        icon: "💀",
        secret: true
    },
    {
        id: "true_ending",
        name: "Freedom",
        description: "Escape Hardcore Mode",
        condition: (stats) => stats.hardcoreEscaped,
        reward: "You're finally free... or are you?",
        bonus: { globalMultiplier: 10 },
        icon: "🕊️",
        secret: true
    }
];

export const checkAchievements = (stats, unlockedAchievements) => {
    const newUnlocks = [];

    ACHIEVEMENTS.forEach(achievement => {
        if (!unlockedAchievements.includes(achievement.id) && achievement.condition(stats)) {
            newUnlocks.push(achievement);
        }
    });

    return newUnlocks;
};

export const calculateAchievementBonuses = (unlockedAchievements) => {
    const bonuses = {
        clickMultiplier: 1,
        globalMultiplier: 1,
        passiveMultiplier: 1
    };

    unlockedAchievements.forEach(achievementId => {
        const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
        if (achievement && achievement.bonus) {
            if (achievement.bonus.clickMultiplier) {
                bonuses.clickMultiplier *= achievement.bonus.clickMultiplier;
            }
            if (achievement.bonus.globalMultiplier) {
                bonuses.globalMultiplier *= achievement.bonus.globalMultiplier;
            }
            if (achievement.bonus.passiveMultiplier) {
                bonuses.passiveMultiplier *= achievement.bonus.passiveMultiplier;
            }
        }
    });

    return bonuses;
};
