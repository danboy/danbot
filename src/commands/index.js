import { slashCommand } from "./slash.js";

export const addCommands = (app) => {
  app.command(`/${process.env.SLASH_COMMAND}`, slashCommand);

  return app;

}
