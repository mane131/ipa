// 30 Upgrades: 10 Auto-Clickers, 10 Click Power, 10 Efficiency Multipliers

export const UPGRADES = [
  // AUTO-CLICKER UPGRADES (1-10) - Passive Income
  {
    id: 1,
    name: "Tiny Cursor",
    description: "Generates 1 point per second",
    baseCost: 10,
    costMultiplier: 1.5,
    incomePerSecond: 1,
    type: "auto",
    icon: "🖱️",
    maxLevel: 999
  },
  {
    id: 2,
    name: "Helper Bot",
    description: "Generates 2 points per second",
    baseCost: 50,
    costMultiplier: 1.5,
    incomePerSecond: 2,
    type: "auto",
    icon: "🤖",
    maxLevel: 999
  },
  {
    id: 3,
    name: "Click Farm",
    description: "Generates 5 points per second",
    baseCost: 200,
    costMultiplier: 1.5,
    incomePerSecond: 5,
    type: "auto",
    icon: "🏭",
    maxLevel: 999
  },
  {
    id: 4,
    name: "AI Assistant",
    description: "Generates 10 points per second",
    baseCost: 1000,
    costMultiplier: 1.5,
    incomePerSecond: 10,
    type: "auto",
    icon: "🧠",
    maxLevel: 999
  },
  {
    id: 5,
    name: "Quantum Clicker",
    description: "Generates 25 points per second",
    baseCost: 5000,
    costMultiplier: 1.5,
    incomePerSecond: 25,
    type: "auto",
    icon: "⚛️",
    maxLevel: 999
  },
  {
    id: 6,
    name: "Time Machine",
    description: "Generates 50 points per second",
    baseCost: 25000,
    costMultiplier: 1.5,
    incomePerSecond: 50,
    type: "auto",
    icon: "⏰",
    maxLevel: 999
  },
  {
    id: 7,
    name: "Reality Warper",
    description: "Generates 100 points per second",
    baseCost: 100000,
    costMultiplier: 1.5,
    incomePerSecond: 100,
    type: "auto",
    icon: "🌀",
    maxLevel: 999
  },
  {
    id: 8,
    name: "Universe Generator",
    description: "Generates 250 points per second",
    baseCost: 500000,
    costMultiplier: 1.5,
    incomePerSecond: 250,
    type: "auto",
    icon: "🌌",
    maxLevel: 999
  },
  {
    id: 9,
    name: "Infinity Engine",
    description: "Generates 500 points per second",
    baseCost: 2500000,
    costMultiplier: 1.5,
    incomePerSecond: 500,
    type: "auto",
    icon: "♾️",
    maxLevel: 999
  },
  {
    id: 10,
    name: "Omnipotent Clicker",
    description: "Generates 1000 points per second",
    baseCost: 10000000,
    costMultiplier: 1.5,
    incomePerSecond: 1000,
    type: "auto",
    icon: "👁️",
    maxLevel: 999
  },

  // CLICK POWER UPGRADES (11-20) - Points per Click
  {
    id: 11,
    name: "Better Fingers",
    description: "+1 points per click",
    baseCost: 15,
    costMultiplier: 1.6,
    clickPowerBonus: 1,
    type: "power",
    icon: "👆",
    maxLevel: 999
  },
  {
    id: 12,
    name: "Reinforced Thumb",
    description: "+3 points per click",
    baseCost: 75,
    costMultiplier: 1.6,
    clickPowerBonus: 3,
    type: "power",
    icon: "👍",
    maxLevel: 999
  },
  {
    id: 13,
    name: "Turbo Touch",
    description: "+7 points per click",
    baseCost: 350,
    costMultiplier: 1.6,
    clickPowerBonus: 7,
    type: "power",
    icon: "⚡",
    maxLevel: 999
  },
  {
    id: 14,
    name: "Mega Tap",
    description: "+15 points per click",
    baseCost: 1500,
    costMultiplier: 1.6,
    clickPowerBonus: 15,
    type: "power",
    icon: "💪",
    maxLevel: 999
  },
  {
    id: 15,
    name: "Hyper Click",
    description: "+35 points per click",
    baseCost: 7500,
    costMultiplier: 1.6,
    clickPowerBonus: 35,
    type: "power",
    icon: "🔥",
    maxLevel: 999
  },
  {
    id: 16,
    name: "Ultra Strike",
    description: "+75 points per click",
    baseCost: 35000,
    costMultiplier: 1.6,
    clickPowerBonus: 75,
    type: "power",
    icon: "💥",
    maxLevel: 999
  },
  {
    id: 17,
    name: "Divine Touch",
    description: "+150 points per click",
    baseCost: 150000,
    costMultiplier: 1.6,
    clickPowerBonus: 150,
    type: "power",
    icon: "✨",
    maxLevel: 999
  },
  {
    id: 18,
    name: "Cosmic Slam",
    description: "+350 points per click",
    baseCost: 750000,
    costMultiplier: 1.6,
    clickPowerBonus: 350,
    type: "power",
    icon: "🌟",
    maxLevel: 999
  },
  {
    id: 19,
    name: "Galactic Punch",
    description: "+750 points per click",
    baseCost: 3500000,
    costMultiplier: 1.6,
    clickPowerBonus: 750,
    type: "power",
    icon: "🌠",
    maxLevel: 999
  },
  {
    id: 20,
    name: "Omnipotent Finger",
    description: "+1500 points per click",
    baseCost: 15000000,
    costMultiplier: 1.6,
    clickPowerBonus: 1500,
    type: "power",
    icon: "🔱",
    maxLevel: 999
  },

  // EFFICIENCY MULTIPLIERS (21-30) - Multiply All Income
  {
    id: 21,
    name: "Double Vision",
    description: "1.5x all income",
    baseCost: 100,
    costMultiplier: 2.0,
    globalMultiplier: 1.5,
    type: "multiplier",
    icon: "👁️‍🗨️",
    maxLevel: 1
  },
  {
    id: 22,
    name: "Hyperfocus",
    description: "2x all income",
    baseCost: 500,
    costMultiplier: 2.0,
    globalMultiplier: 2,
    type: "multiplier",
    icon: "🎯",
    maxLevel: 1
  },
  {
    id: 23,
    name: "Triple Threat",
    description: "3x all income",
    baseCost: 2500,
    costMultiplier: 2.0,
    globalMultiplier: 3,
    type: "multiplier",
    icon: "🔺",
    maxLevel: 1
  },
  {
    id: 24,
    name: "Pentagram Power",
    description: "5x all income",
    baseCost: 12500,
    costMultiplier: 2.0,
    globalMultiplier: 5,
    type: "multiplier",
    icon: "⭐",
    maxLevel: 1
  },
  {
    id: 25,
    name: "Lucky Seven",
    description: "7.5x all income",
    baseCost: 62500,
    costMultiplier: 2.0,
    globalMultiplier: 7.5,
    type: "multiplier",
    icon: "🍀",
    maxLevel: 1
  },
  {
    id: 26,
    name: "Perfect Ten",
    description: "10x all income",
    baseCost: 312500,
    costMultiplier: 2.0,
    globalMultiplier: 10,
    type: "multiplier",
    icon: "🔟",
    maxLevel: 1
  },
  {
    id: 27,
    name: "Dark Bargain",
    description: "15x all income",
    baseCost: 1562500,
    costMultiplier: 2.0,
    globalMultiplier: 15,
    type: "multiplier",
    icon: "😈",
    maxLevel: 1
  },
  {
    id: 28,
    name: "Unholy Alliance",
    description: "25x all income",
    baseCost: 7812500,
    costMultiplier: 2.0,
    globalMultiplier: 25,
    type: "multiplier",
    icon: "👿",
    maxLevel: 1
  },
  {
    id: 29,
    name: "Soul Contract",
    description: "50x all income",
    baseCost: 39062500,
    costMultiplier: 2.0,
    globalMultiplier: 50,
    type: "multiplier",
    icon: "💀",
    maxLevel: 1
  },
  {
    id: 30,
    name: "The Truth",
    description: "100x all income... but at what cost?",
    baseCost: 195312500,
    costMultiplier: 2.0,
    globalMultiplier: 100,
    type: "multiplier",
    icon: "🕳️",
    maxLevel: 1,
    triggersDarkTwist: true
  }
];

export const calculateUpgradeCost = (upgrade, currentLevel) => {
  return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, currentLevel));
};
