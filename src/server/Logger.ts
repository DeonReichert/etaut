import { PoolItem, Pool } from '../models/Pool';

export interface PrefixLoggerOptions {
    logger: Logger
    prefixs: (string | (() => string))[];
}

export class PrefixLogger extends PoolItem<PrefixLoggerOptions> implements Logger {

    static pool = new Pool<PrefixLogger>(PrefixLogger);

    getPrefix(): string[] {
        return this.options.prefixs.map(v => typeof v === 'string' ? v : v());
    }

    log(...args: any[]) {
        this.options.logger.log(...this.getPrefix().concat(args));
    }

    debug(...args: any[]) {
        this.options.logger.debug(...this.getPrefix().concat(args));
    }

    warn(...args: any[]) {
        this.options.logger.warn(...this.getPrefix().concat(args));
    }

    error(...args: any[]) {
        this.options.logger.error(...this.getPrefix().concat(args));
    }

    destroy() {
        PrefixLogger.pool.put(this);
    }

}

export interface Logger {
    debug(...args: any[]): void;
    log(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}