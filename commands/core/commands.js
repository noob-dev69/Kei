const { MessageEmbed } = require('discord.js');
const text = require(`${process.cwd()}/util/string`);

module.exports = {
  name: 'commands',
  aliases: [ 'cmd', 'command' ],
  group: 'core',
  description: 'Sends a list of all commands from each specific command groups',
  clientPermissions: [ 'EMBED_LINKS' ],
  parameters: [],
  get examples(){ return [ this.name, ...this.aliases ]; },
  run: (client, message) => {

    const fields = [];

    for (const group of Object.keys(client.commands.groups).filter(g => g !== 'unspecified')){
      fields.push({
        name: group.charAt(0).toUpperCase() + group.slice(1).toLowerCase(), inline: true,
        value: text.joinArray(client.commands.groups.get(group).map(x => `\`${x.name}\``))
      });
    };

    if (client.commands.groups.get('unspecified').size){
      fields.push({
        name: 'Unspecified', inline: true,
        value: text.joinArray(client.commands.groups.get('unspecified').map(x => `\`${x.name}\``))
      });
    };

    return message.channel.send(
      new MessageEmbed()
      .setColor('#fa95b1')
      .addFields(fields.sort((A,B) => B.value.length - A.value.length))
      .setAuthor('Kei\'s full list of commands!')
      .setFooter(`Command List | \©️${new Date().getFullYear()} Kei`)
      .setDescription([
        `You may get the full detail of each command by typing \`${client.prefix}help <command>\``,
      ].join('\n'))
    );
  }
};
