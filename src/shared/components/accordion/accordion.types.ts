import { IconProps } from '../icon';

type AccordionType = 'single' | 'multiple';
export interface AccordionProps {
   type?: AccordionType;
   className?: string;
   items: AccordionItem[];
   disabled?: boolean;
   icon?: IconProps;
   defaultValue?: string | string[];
}

export interface AccordionItem {
   label?: string;
   icon?: IconProps;
   trailingContent?: React.ReactNode;
   value: string;
   disabled?: boolean;
   content: React.ReactNode;
}

export interface AccordionItemProps extends AccordionItem {
   isLast: boolean;
   isActive: boolean;
   toggleItem(value: string): void;
}
