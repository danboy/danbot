import { getStoresFromCache } from "../services/stores/controller.js";


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
  switch (command.text) {
    case "stores":
      console.info('fetching stores')
      const stores = await getStoresFromCache();
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
