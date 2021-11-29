export interface RewardsConfig {
    base: string;
    ext: string;
    max_weight: number;
    ability_check: Reward;
    attack_roll: Reward;
    extra_attack: Reward;
    fate_point: Reward;
    hero_point: Reward;
    initiative: Reward;
    perm_hp: Reward;
    rep_point: Reward;
    saving_throw: Reward;
    temp_hp: Reward;
}

export interface Reward {
    name: string;
    weight: number;
}

export const rewards_config: RewardsConfig = {
    "base": ".\\Darkest Dream\\Chapter 1\\Resources\\Gooey Rewards\\Images\\",
    "ext": ".jpg",
    "max_weight": 37,
    "ability_check": {
        "name": "Ability Check Advantage",
        "weight": 5
    },
    "attack_roll": {
        "name": "Attack Roll Advantage",
        "weight": 5
    },
    "extra_attack": {
        "name": "Extra Attack",
        "weight": 3
    },
    "fate_point": {
        "name": "Fate Point",
        "weight": 2
    },
    "hero_point": {
        "name": "Hero Point",
        "weight": 2
    },
    "initiative": {
        "name": "Initiative Roll Advantage",
        "weight": 5
    },
    "perm_hp": {
        "name": "Permanent Hit Point",
        "weight": 3
    },
    "rep_point": {
        "name": "Reputation Point",
        "weight": 2
    },
    "saving_throw": {
        "name": "Saving Throw Advantage",
        "weight": 5
    },
    "temp_hp": {
        "name": "Temporary Hit Points",
        "weight": 5
    }
}