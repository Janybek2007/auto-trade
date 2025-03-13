import type { StateCreator } from 'zustand'

export type ActionImpl<State, Payload extends any[] = any[]> = (
	state: State,
	...args: Payload
) => void;

export type StoreActions<State, Actions extends Record<string, ActionImpl<State>>> = {
	[K in keyof Actions]: (
		...args: Parameters<Actions[K]> extends [any, ...infer P] ? P : never
	) => void;
};

export type ZustandMiddleware = <T>(
	config: StateCreator<T>,
	options?: any
) => StateCreator<T>;
