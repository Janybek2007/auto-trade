import {
	type SuspenseProps,
	Suspense,
	forwardRef,
	type ComponentType,
	createElement,
	type ReactNode,
	type ComponentRef,
	type ComponentProps,
	type ForwardRefExoticComponent,
	type PropsWithoutRef,
	type RefAttributes
} from 'react';

type SuspenseSharedProps = Omit<SuspenseProps, 'fallback'>;

type SuspensePropsWithComponent = SuspenseSharedProps & {
	fallback?: never;
	FallbackComponent: ComponentType;
};

type SuspensePropsWithFallback = SuspenseSharedProps & {
	fallback: ReactNode;
	FallbackComponent?: never;
};

type WithSuspenseProps = SuspensePropsWithComponent | SuspensePropsWithFallback;

export function withSuspense<T extends ComponentType<any>>(
	WrappedComponent: T,
	suspenseProps: WithSuspenseProps
): ForwardRefExoticComponent<
	PropsWithoutRef<ComponentProps<T>> & RefAttributes<ComponentRef<T>>
> {
	const Wrapped = forwardRef<ComponentRef<T>, ComponentProps<T>>(
		(props, ref) => {
			const { fallback, FallbackComponent, ...otherSuspenseProps } =
				suspenseProps;

			const suspenseFallback =
				fallback ??
				(FallbackComponent ? createElement(FallbackComponent) : null);

			return createElement(
				Suspense,
				{ ...otherSuspenseProps, fallback: suspenseFallback },
				createElement(WrappedComponent, { ...props, ref })
			);
		}
	);

	const wrappedComponentName =
		WrappedComponent.displayName || WrappedComponent.name || 'Unknown';
	Wrapped.displayName = `withSuspense(${wrappedComponentName})`;

	return Wrapped;
}
