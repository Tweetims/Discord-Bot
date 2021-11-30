export function roll(min: number, max: number){
    return min + Math.floor(Math.random() * (max - min + 1));
}

export function rollDie(max: number){
    return roll(1, max);
}