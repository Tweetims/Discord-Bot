import { Command } from "./command";
import { CommandContext } from "../models/command_context";
import items from "../config/items_config.json"

export class SpecialItemsCommand implements Command {
    commandNames = ['item', 'items'];
    exclude = ['base', 'ext'];

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}item {special_item_id} to send an item to the channel.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        if (parsedUserCommand.args.length < 1) {
            await parsedUserCommand.originalMessage.reply(this.getHelpMessage(parsedUserCommand.commandPrefix));
            return;
        }

        let handout_name = parsedUserCommand.args[0];

        if (handout_name in this.exclude || !items.hasOwnProperty(handout_name)){
            await parsedUserCommand.originalMessage.reply(`${this.getHelpMessage(parsedUserCommand.commandPrefix)}
            Unable to find item ${handout_name}`);
            return;
        }

        const handout = (<any>items)[handout_name];

        await parsedUserCommand.originalMessage.reply({
            files: [
                `${items.base}${handout.name}${items.ext}`
            ],
            content:  handout.name
        });
    }

    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        return true;
    }
}