export const StorePicker = (storeSelections) => {
  const storePickerBlock = {
    type: 'input',
    block_id: 'dvt_store',
    element: {
      type: 'static_select',
      action_id: 'dvt_store',
      placeholder: {
        type: 'plain_text',
        text: 'Select a store',
        emoji: true,
      },
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
  block_id: 'submission_date',
  element: {
    type: 'datepicker',
    action_id: 'submission_date',
    initial_date: null,
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
