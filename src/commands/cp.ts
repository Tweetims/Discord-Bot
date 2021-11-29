import { Message, TextChannel } from 'discord.js';
import { CommandContext } from '../models/command_context';
import { Command } from './command';
import { config } from '../config/config'

export class CopyCommand implements Command {
    commandNames = ['cp'];

    getHelpMessage(commandPrefix: string): string {
        return `Use ${commandPrefix}cp {from_id} {channel_id} to copy a message from one channel to another.`;
    }

    async run(parsedUserCommand: CommandContext): Promise<void> {
        if (parsedUserCommand.args.length < 2) {
            await parsedUserCommand.originalMessage.reply(this.getHelpMessage(parsedUserCommand.commandPrefix));
            return;
        }
        const channel: TextChannel = (await parsedUserCommand.originalMessage.channel.fetch()) as TextChannel;

        const messageSrc: Message = await channel.messages.fetch(parsedUserCommand.args[0]);

        const channelTarget: TextChannel = (await parsedUserCommand.originalMessage.client.channels.fetch(parsedUserCommand.args[1])) as TextChannel;

        await channelTarget.send({
            content: messageSrc.content
        });

        await parsedUserCommand.originalMessage.reply(`Copied message ${parsedUserCommand.args[0]} to channel ${parsedUserCommand.args[1]}`);
    }

    hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
        if (parsedUserCommand.originalMessage.member?.roles.cache.has(config.dmRoleId)) return true;
        return false;
    }
}