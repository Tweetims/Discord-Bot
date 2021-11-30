import { Command } from "./command";
import { CommandContext } from "../models/command_context";
import handouts_config from "../config/handouts_config.json";
import { config } from '../config/config'

export class HandoutsCommand implements Command {
    commandNames = ['handouts', 'handout', 'h'];
    exclude = ['base', 'ext'];

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}handout {handout_id} to send a handout to the channel.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        if (parsedUserCommand.args.length < 1) {
            await parsedUserCommand.originalMessage.reply(this.getHelpMessage(parsedUserCommand.commandPrefix));
            return;
        }

        let handout_name = parsedUserCommand.args[0];

        if (handout_name in this.exclude || !handouts_config.hasOwnProperty(handout_name)){
            await parsedUserCommand.originalMessage.reply(`${this.getHelpMessage(parsedUserCommand.commandPrefix)}
            Unable to find handout ${handout_name}`);
            return;
        }

        const handout = (<any>handouts_config)[handout_name];

        await parsedUserCommand.originalMessage.reply({
            files: [
                `${handouts_config.base}${handout.name}${handouts_config.ext}`
            ],
            content:  handout.name
        });
    }

    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        if (parsedUserCommand.originalMessage.member?.roles.cache.has(config.dmRoleId)) return true;
        return false;
    }
}