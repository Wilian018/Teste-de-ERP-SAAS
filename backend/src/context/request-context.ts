import { AsyncLocalStorage } from 'async_hooks';

export interface RequestContextData {
  companyId?: string;
  userId?: string;
  role?: string;
}

export const RequestContext = new AsyncLocalStorage<RequestContextData>();
