import bolt from '@slack/bolt';
const { App, ExpressReceiver } = bolt;
import express from 'express';
import { addActions } from './src/actions/index.js';
import { addEvents } from './src/events/index.js';
import { addCommands } from './src/commands/index.js';
import { addRoutes } from './src/routes/index.js';
import { addViews } from './src/views/index.js';

import { config } from 'dotenv';
config();

const receiver = new ExpressReceiver({ signingSecret: process.env.SLACK_SIGNING_SECRET });
receiver.router.use(express.json());

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  receiver
});

addEvents(app);
addCommands(app);
addRoutes(receiver);

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Danbot lives!');
})();
