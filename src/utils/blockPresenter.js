import { DatePicker, StorePicker } from './components.js';

const generateBlockFromField = ({ body: { fields } }) => {
  return fields.map((field) => {
    switch (field.entry_type) {
      case 'INPUT':
        return {
          type: 'input',
          block_id: field.id,
          element: {
            type: 'plain_text_input',
            action_id: 'dvt_other',
            multiline: false,
          },
          label: {
            type: 'plain_text',
            text: field.title,
            emoji: true,
          },
          optional: false,
        };
      case 'LONG_TEXT':
      default:
        return {
          type: 'input',
          block_id: field.id,
          element: {
            type: 'plain_text_input',
            action_id: field.id,
            multiline: true,
          },
          label: {
            type: 'plain_text',
            text: field.title,
            emoji: true,
          },
          optional: false,
        };
    }
  });
};

const surveyTemplateToBlocks = (template, storeChannels) => {
  const meta = { ...template.response };
  delete meta.body;
  delete meta.comments;
  const blockTemplate = {
    audience: {
      channel_ids: [{ slack_channel_id: template.slack_channel_id }],
    },
    survey: {
      type: 'modal',
      callback_id: 'survey_submit',
      private_metadata: {
        ...meta,
        name: template.response.body.name,
      },
      title: {
        type: 'plain_text',
        text: template.name,
        emoji: true,
      },
      submit: {
        type: 'plain_text',
        text: 'Submit',
        emoji: true,
      },
      close: {
        type: 'plain_text',
        text: 'Cancel',
        emoji: true,
      },
      blocks: [
        { ...DatePicker },
        {
          type: 'divider',
        },
        { ...StorePicker(storeChannels) },
        {
          type: 'divider',
        },
        ...generateBlockFromField(template.response),
      ],
    },
  };
  return blockTemplate;
};

export const surveyTemplatesToBlocks = (templates) => {
  const surveys = {};
  Object.keys(templates).forEach((storeId) => {
    const tmp = {
      ...templates[storeId],
      name: `${templates[storeId].response?.body?.name} ${storeId}`,
    };
    surveys[tmp.name] = surveyTemplateToBlocks(tmp, [{ code: storeId }]);
  });
  return surveys;
};

const surveyResponseToFields = (response) => {
  return {
    body: {
      id: response.meta.survey_id,
      name: response.meta.name,
      fields: response
        .filter((r) => r)
        .map((r) => {
          return {
            id: r.block_id,
            title: r.question,
            data_type: 'STRING',
            entry_type: 'LONG_TEXT',
            response: r.text,
          };
        }),
    },
  };
};

export const surveyResultsToResponse = (survey) => {
  const payload = {
    ...survey.meta,
    ...surveyResponseToFields(survey),
  };
  return payload;
};
