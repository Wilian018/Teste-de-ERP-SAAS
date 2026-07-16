import { AsyncLocalStorage } from 'async_hooks';
export interface RequestContextData {
    companyId?: string;
    userId?: string;
    role?: string;
}
export declare const RequestContext: AsyncLocalStorage<RequestContextData>;
