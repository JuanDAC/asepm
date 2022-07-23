

const selectorSubcommand = async ({ flags = {}, command, subcommand, args, } = {}) => {
  const { debug } = flags;


  //** SUBCOMMANDS */

  /**
   * @type {command} install plugin [<plugin>] [<plugin>] ...
   * @description Install asepm specific plugins
   * @author JuanDAC <https://www.linkedin.com/in/juandac/>
   * @author JuanDAC <https://github.com/juandac/>
   * @see https://www.npmjs.com/package/asepm#install
   * @example asepm install plugin juandac/ase-reload-plugin
   */
  if (command.trim() === ('install') && subcommand.trim() === ('plugin') && args.length >= 1)
    return await installPlugin({ debug, dependencies: args, flags });

  /**
   * @type {command} install dependency [<dependency>] [<dependency>] ...
   * @description Install asepm specific dependencies
   * @author JuanDAC <https://www.linkedin.com/in/juandac/>
   * @author JuanDAC <https://github.com/juandac/>
   * @see https://www.npmjs.com/package/asepm#install
   * @example asepm install dependency juandac/ase-ui juandac/ase-deep-copy
   */
  if (command.trim() === ('install') && subcommand.trim() === ('dependency') && args.length >= 1)
    return await installSpecific({ debug, dependencies: args, flags });

}

module.exports = { selectorSubcommand }
