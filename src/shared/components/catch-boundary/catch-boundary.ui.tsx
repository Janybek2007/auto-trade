import {
	ErrorComponent,
	Link,
	rootRouteId,
	useMatch,
	useRouter
} from '@tanstack/react-router';
import type { ErrorComponentProps } from '@tanstack/react-router';
import styles from './styles.module.scss';

export function CatchBoundary({ error }: ErrorComponentProps) {
	const router = useRouter();
	const isRoot = useMatch({
		strict: false,
		select: (state: Record<string, any>) => state.id === rootRouteId
	});

	console.error('CatchBoundary Error:', error);

	return (
		<div className={styles.container}>
			<ErrorComponent error={error} />
			<div className={styles.buttonGroup}>
				<button onClick={() => router.invalidate()} className={styles.button}>
					Try Again
				</button>
				{isRoot ? (
					<Link to='/' className={styles.button}>
						Home
					</Link>
				) : (
					<Link
						to='/'
						className={styles.button}
						onClick={e => {
							e.preventDefault();
							window.history.back();
						}}
					>
						Go Back
					</Link>
				)}
			</div>
		</div>
	);
}
