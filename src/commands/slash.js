import { getAuthTokenFromCache } from "../services/auth.js";
export const slashCommand = async ({  ack, command, say }) => {
  await ack();
  switch (command.text) {
    case "bar":
      await say("I think a good dive bar would be nice");
      break;
    case "stores":
      const token = await getAuthTokenFromCache();
      await say(`getting a list of stores`,);
      break;
    case "foo":
      await say("bar");
      break;
    default:
      await say(`I'm not sure what to do with "${command.text}"`);
      break;
  }
};
