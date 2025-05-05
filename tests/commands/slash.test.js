import { expect, test, vi } from 'vitest'
import { addCommands } from '../../src/commands/index.js'
console.log({addCommands})
import { appMock } from '../mocks/slackBolt.js'

test('It returns the proper results for a given slash command', () => {
  const app = appMock({slashText: 'foo'});
  const slash = addCommands(app)
  expect(app.ack).toHaveBeenCalledTimes(1)
  expect(app.command).toHaveBeenCalledTimes(1)
  expect(slash.say).toHaveBeenCalledTimes(1)
  console.log({slash});
})
