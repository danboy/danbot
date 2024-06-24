import { getOpenStores } from "../services/portalApi.js";

export const slashCommand = async ({  ack, command, say }) => {
  await ack();
  console.log({text: command.text});
  switch (command.text) {
    case "bar":
      await say("I think a good dive bar would be nice");
      break;
    case "stores":
      const {data} = await getOpenStores();
      console.log({data});
      await say(`Currently ${data?.length} live stores.`);
      break;
    case "foo":
      await say("bar");
      break;
    case '':
    case "":
      await say(`Gonna need a little more information there bucko`);
      break;
    default:
      await say(`I'm not sure what to do with "${command.text}"`);
      break;
  }
};
