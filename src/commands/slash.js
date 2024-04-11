export const slashCommand = async ({ command, ack, say }) => {
  await ack();
  console.log("command", command);
  switch (command.text) {
    case "bar":
      await say("I think a good dive bar would be nice");
      break;
    default:
      await say(`I'm not sure what to do with "${command.text}"`);
      break;
  }
};
