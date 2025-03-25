'use client';
import React from 'react';
import AccordionItem from './accordion-item.ui';
import s from './styles.module.scss';
import { AccordionProps } from './accordion.types';

const Accordion: React.FC<AccordionProps> = ({
	items,
	className,
	type = 'single',
	defaultValue = [],
	disabled: isDisabled,
	icon
}) => {
	const [activeItems, setActiveItems] = React.useState<string[]>(
		typeof defaultValue == 'string' ? [defaultValue] : defaultValue
	);

	const toggleItem = React.useCallback(
		(value: string) => {
			setActiveItems(prev => {
				if (type == 'multiple') {
					return prev.includes(value)
						? prev.filter(item => item !== value)
						: [...prev, value];
				}
				return prev.includes(value) ? [] : [value];
			});
		},
		[type]
	);

	return (
		<div data-accorion-layout className={`${s.accordion} ${className}`}>
			{items.map(({ value, disabled = isDisabled, ...rest }) => (
				<AccordionItem
					isActive={activeItems.includes(value)}
					toggleItem={() => toggleItem(value)}
					isLast={items[items.length - 1].value === value}
					key={value}
					icon={icon || rest.icon}
					value={value}
					disabled={disabled}
					{...rest}
				/>
			))}
		</div>
	);
};

export default Accordion;
