import { vi } from 'vitest'

const app = ({slashText}={slashText: 'stores'}) => {
  const result =  {
    ack: vi.fn(),
    say: vi.fn()
  }
  result.command = vi.fn().mockImplementation((command, func) => {
      return func({ ...result, command: {text:slashText} });
  })
  return result;
}

export const appMock = app;

