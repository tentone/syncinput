export declare class EventManager {
    private events;
    add(target: any, event: string, callback: Function): void;
    addAndCreate(target: any, event: string, callback: Function): void;
    clear(): void;
    remove(target: any, event: string): void;
    create(): void;
    destroy(): void;
}
