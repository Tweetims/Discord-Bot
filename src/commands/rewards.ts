import { Command } from "./command";
import { CommandContext } from "../models/command_context";
import rewards_config from "../config/rewards_config.json"
import { rollDie } from "./roll"
import { config } from "../config/config";

export class RewardCommand implements Command {
    commandNames = ['reward', 'rewards', 'r'];
    exclude = ['base', 'ext', 'max_weight'];

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}reward roll to roll a reward.
        Use ${commandPrefix}reward show to see the names of the rewards.
        Use ${commandPrefix} reward show {reward_name} to show the card associated with the reward.`;
    }

    getRewardTuple(reward_mapping: any, reward: string, weight: number, total_weight: number){
        for (var i = total_weight; i < total_weight + weight; i++){
            reward_mapping[i.toString()] = reward;
        }
    }

    getRewardString(pool: any, reward_index: number){
        for (var key in pool){
            if (key === reward_index.toString()) return pool[key];
        }
        return 'INVALID_REWARD_INDEX';
    }

    GetShowRewards(reward_mappings: any){
        return [...new Set(Object.values(reward_mappings).sort())].join('\n')
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        if (parsedUserCommand.args.length < 1) {
            await parsedUserCommand.originalMessage.reply(this.getHelpMessage(parsedUserCommand.commandPrefix));
            return;
        }

        let cmd = parsedUserCommand.args[0];

        if (parsedUserCommand.args.length < 2){
            if (cmd === 'show'){
                var reward_list = {};
                var total_weight: number = 0;

                for (var reward in rewards_config){
                    if (this.exclude.indexOf(reward) > -1) continue;
                    
                    this.getRewardTuple(reward_list, (<any>rewards_config)[reward].name, (<any>rewards_config)[reward].weight, total_weight);
                    total_weight += (<any>rewards_config)[reward].weight;
                }

                await parsedUserCommand.originalMessage.reply({
                    content: `Available rewards pool are:\n${this.GetShowRewards(reward_list)}
                    Total Cards: ${total_weight}`
                });
            }
            else if (cmd === 'roll'){
                var reward_list = {};
                var total_weight: number = 0;

                for (var reward in rewards_config){
                    if (this.exclude.indexOf(reward) > -1) continue;
                    
                    this.getRewardTuple(reward_list, (<any>rewards_config)[reward].name, (<any>rewards_config)[reward].weight, total_weight);
                    total_weight += (<any>rewards_config)[reward].weight;
                }
                var roll_check = rollDie(20);

                if (roll_check >= config.rewardBias){
                    var roll = rollDie(total_weight);
                    var reward_name = this.getRewardString(reward_list, roll);
                
                    await parsedUserCommand.originalMessage.reply({
                        files: [
                            `${rewards_config.base}${reward_name}${rewards_config.ext}`
                        ],
                        content: `You rolled a **${roll_check}**. You can roll on the **reward table**!
                        You rolled a **${roll}** on the **reward table** for a **${reward_name}**`
                    });
                }else{
                    await parsedUserCommand.originalMessage.reply({
                        content: `You rolled a **${roll_check}**. You need a **${config.rewardBias}** or greater to roll on the **reward table**.`
                    });
                }
            }
        }
        else if(parsedUserCommand.args.length < 3){
            
        }
        else{
            await parsedUserCommand.originalMessage.reply(`${this.getHelpMessage(parsedUserCommand.commandPrefix)}
            Unable to find reward command.`);
            return;
        }
    }

    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        return true;
    }
}