import {formatDateISO} from "./date.js";
export const StorePicker = (storeSelections) => {
  const storePickerBlock = {
    type: 'input',
    block_id: 'leap_store',
    element: {
      type: 'static_select',
      action_id: 'leap_store',
      placeholder: {
        type: 'plain_text',
        text: 'Select a store',
        emoji: true,
      },
      options: [
        ...storeSelections
      ]
    },
    label: {
      type: 'plain_text',
      text: 'Which store are you submitting for today?',
      emoji: true,
    },
  };

  return storePickerBlock;
};

export const DatePicker = {
  type: 'input',
  block_id: 'survey_date',
  element: {
    type: 'datepicker',
    action_id: 'survey_date',
    initial_date: formatDateISO(new Date()),
    placeholder: {
      type: 'plain_text',
      text: 'Select a date',
    },
  },
  label: {
    type: 'plain_text',
    text: 'Which date are you submitting for?',
    emoji: true,
  },
};


export const launchSurveyButton = (survey) => {
  return {
    text: survey.title.text + ' Survey',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
            survey.title.text === 'End of Day Recap'
              ? `<!channel>` + ' ' + survey.title.text
              : survey.title.text,
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Start Survey',
              emoji: true,
            },
            action_id: 'launch_survey',
            value: survey.title.text,
          },
        ],
      },
    ],
  };
};
