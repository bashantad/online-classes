export const API_ROOT = process.env.API_HOST
export const API_WS_ROOT = process.env.API_WS_ROOT

export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
};
