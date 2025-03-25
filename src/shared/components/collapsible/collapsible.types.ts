export interface CollapsibleProps {
	disabled?: boolean;
	className?: string;
	transition?: string;
	children?: React.ReactNode;
	trigger?: React.ReactNode;
	value: boolean;
}
