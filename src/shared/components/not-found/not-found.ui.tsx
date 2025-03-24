import { Link } from '@tanstack/react-router';
import styles from './styles.module.scss';

export function NotFound({ children }: { children?: any }) {
	return (
		<div className={styles.container}>
			<div className={styles.message}>
				{children || <p>The page you are looking for does not exist.</p>}
			</div>
			<p className={styles.buttonGroup}>
				<button
					onClick={() => window.history.back()}
					className={styles.backButton}
				>
					Go back
				</button>
				<Link to='/' className={styles.homeButton}>
					Start Over
				</Link>
			</p>
		</div>
	);
}
