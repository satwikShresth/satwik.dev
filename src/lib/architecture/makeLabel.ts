import type { LabelData } from './types';

// Helper function to create labels with icons (equivalent to makeLabel from React version)
export function makeLabel(iconName: string, text: string): LabelData {
  return {
    iconName,
    text
  };
}
