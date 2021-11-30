import { Command } from "./command";
import { CommandContext } from "../models/command_context";
import portraits_config from "../config/portraits_config.json";

export class PortraitsCommand implements Command {
    commandNames = ['portrait', 'portraits', 'p'];
    exclude = ['base', 'ext'];

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}portrait {portrait_id} to send a portrait to the channel.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        if (parsedUserCommand.args.length < 1) {
            await parsedUserCommand.originalMessage.reply(this.getHelpMessage(parsedUserCommand.commandPrefix));
            return;
        }

        let portrait_name = parsedUserCommand.args[0];

        if (portrait_name in this.exclude || !portraits_config.hasOwnProperty(portrait_name)){
            await parsedUserCommand.originalMessage.reply(`${this.getHelpMessage(parsedUserCommand.commandPrefix)}
            Unable to find character portrait: ${portrait_name}`);
            return;
        }

        const portrait = (<any>portraits_config)[portrait_name];

        await parsedUserCommand.originalMessage.reply({
            files: [
                `${portraits_config.base}${portrait.name}${portraits_config.ext}`
            ],
            content:  portrait.name
        });
    }

    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        return true;
    }
}