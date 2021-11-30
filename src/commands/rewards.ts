import { Command } from "./command";
import { CommandContext } from "../models/command_context";
import rewards from "../config/rewards_config.json"

interface Reward {
    name: string;

}

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

                for (var reward in rewards){
                    if (this.exclude.indexOf(reward) > -1) continue;
                    
                    this.getRewardTuple(reward_list, (<any>rewards)[reward].name, (<any>rewards)[reward].weight, total_weight);
                    total_weight += (<any>rewards)[reward].weight;
                }

                await parsedUserCommand.originalMessage.reply({
                    content: `Available rewards pool are:\n${this.GetShowRewards(reward_list)}
                    Total Cards: ${total_weight}`
                });
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