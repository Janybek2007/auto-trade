import { create, type StateCreator } from 'zustand';
import { produce, type Draft } from 'immer';
import type {
	ActionImpl,
	ZustandMiddleware,
	StoreActions
} from './create-store.types';

export function createStore<
	State,
	Actions extends Record<string, ActionImpl<State>>
>(config: {
	state: State;
	actions: Actions;
	middleware?: Array<[mw: ZustandMiddleware, options?: any]>;
}) {
	type StoreType = State & StoreActions<State, Actions>;

	const initialStoreConfig: StateCreator<StoreType> = set => {
		const actions = Object.keys(config.actions).reduce((acc, key) => {
			const action = config.actions[key];
			acc[key as keyof Actions] = ((...args: any[]) => {
				set(
					produce((draft: Draft<State>) => {
						action(draft as State, ...args);
					}) as unknown as StoreType
				);
			}) as any;
			return acc;
		}, {} as StoreActions<State, Actions>);

		return {
			...config.state,
			...actions
		} as StoreType;
	};

	// Применяем middleware
	let storeConfig: StateCreator<any> = initialStoreConfig;
	if (config.middleware) {
		config.middleware.forEach(([middleware, options]) => {
			storeConfig = middleware(storeConfig, options);
		});
	}

	// Создаем хранилище
	const store = create<StoreType>(storeConfig);

	return {
		useStore: store,
		state: config.state,
		actions: store.getState()
	};
}
