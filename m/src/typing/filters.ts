/* istanbul ignore file */

export type TFilters = {
  setFilter: (a: string, b: string) => void;
  filterOptions: TFilterOptions[];
};

export type TGroupFilterOptions = {
  columns: any;
  setSearch: (property: string, value: string) => void;
  editColumns: (columns: any) => void;
};

export type THandleFilter = {
  filterName: string;
  setCustomFilter: React.Dispatch<React.SetStateAction<string[] | string | null>>;
  isArray: boolean;
};

export type TOptions = {
  label: string;
  defaultChecked: boolean;
  id: string;
  value: string;
  name: string;
  isNew?: boolean;
};

export type TGroupCheckbox = {
  data: TOptions[];
  onChange: (a: string, b: string) => void;
};

export type TGroupRadio = {
  data: TOptions[];
  onChange: (a: string, b: string) => void;
};

export type TFilterOptions = any;

export type TFilterDataOptions = {
  defaultChecked: boolean;
  id: string;
  value: string;
  name: string;
  label: string;
  index?: number;
  onChange?: (a: string, b: string) => void;
};

export type TFilterItem = {
  Component: any;
  setFilter: (name: string, value: string) => void;
  data: TOptions[];
}
