export interface Filters {
   price: string;
   year_of_production: string;
   mileage: string;
   kpp_type: string;
   fuel_type: string;
   bodywork: string;
}

export interface Brand {
   name: string;
   logo: string;
}

export interface FiltrationContextType {
   compares: string[];
   itemType: 'card' | 'list';
   filters: Filters;
   activeBrands: Brand[];
   setActiveBrands: React.Dispatch<React.SetStateAction<Brand[]>>;
   onCompares: (car_id: string, actions?: any[]) => void;
   toggleItemType: () => void;
   updateFilter: (field: keyof Filters, value: string) => void;
   resetFilters: () => void;
   setAllFilters: (newFilters: Partial<Filters>) => void;
   modalOpen: ModalOpenType;
   setModalOpen: React.Dispatch<React.SetStateAction<ModalOpenType>>;
}

export type ModalOpenType = 'parameters' | 'stamp' | null;
