import { getOpenStores, getSurveys } from "../services/portalApi.js";


const blocks = [
  {
    "type": "section",
    "block_id": "section678",
    "text": {
      "type": "mrkdwn",
      "text": "Pick an item from the dropdown list"
    },
    "accessory": {
      "action_id": "text1234",
      "type": "static_select",
      "placeholder": {
        "type": "plain_text",
        "text": "Select an item"
      },
      "options": [
      ]
    }
  }
]


export const slashCommand = async ({ ack, client, command, say }) => {
  await ack();
  console.log({text: command.text});
  const {data: stores} = await getOpenStores();
  switch (command.text) {
    case "bar":
      await say("I think a good dive bar would be nice");
      break;
    case "stores":
      console.log({stores});
      if(stores){
        await say(`Currently ${stores?.length} live stores.`);
      }else{
        await say(`trouble fetching stores.`);
      }
      break;
    case "surveys":
      blocks[0].accessory.options = stores.map((store) => {
        return {
          "text": {
            "type": "plain_text",
            "text": store.code
          },
          "value": store.code
        }
      })
      await client.chat.postEphemeral({
        token: process.env.SLACK_BOT_TOKEN,
        channel: command.channel_id,
        user: command.user_id,
        blocks: blocks,
        text: "none text",
        attachments: [{}],
      })
      //const {data: surveys} = await getSurveys();
      //if(surveys){
      //  await say(`Currently ${surveys?.length} surveys.`);
      //}else{
      //  await say(`trouble fetching surveys.`);
      //}
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
