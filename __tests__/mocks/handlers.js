import { rest } from 'msw';

export const handlers = [rest.get('/api/email', null)];
