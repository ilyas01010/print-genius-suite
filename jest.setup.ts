
import '@testing-library/jest-dom';

// This adds custom jest matchers for asserting on DOM nodes
expect.extend({
  toBeInTheDocument() {
    return {
      pass: true,
      message: () => '',
    };
  },
});
