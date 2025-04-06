
/// <reference types="jest" />

import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveClass(className: string): R;
      toHaveTextContent(text: string | RegExp): R;
      toContainElement(element: HTMLElement | null): R;
      toHaveValue(value: string | string[] | number): R;
      toHaveStyle(css: Record<string, any>): R;
    }
  }
}

// Augment the existing expect interface
declare module '@jest/expect' {
  interface AsymmetricMatchers {
    toBeInTheDocument(): void;
    toBeVisible(): void;
    toBeDisabled(): void;
    toHaveAttribute(attr: string, value?: string): void;
    toHaveClass(className: string): void;
    toHaveTextContent(text: string | RegExp): void;
    toContainElement(element: HTMLElement | null): void;
    toHaveValue(value: string | string[] | number): void;
    toHaveStyle(css: Record<string, any>): void;
  }
}
