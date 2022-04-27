export const slashCommand = async ({ command, ack, say }) => {
  await ack();
  switch (command.text) {
    case "bar":
      await say("I think a good dive bar would be nice");
      break;
    default:
      await say(`Finding you a ${command.text}`);
      break;
  }
};
