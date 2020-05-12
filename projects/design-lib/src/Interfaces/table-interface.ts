
export interface FFColumnDef {
    header?: string;
    isSortable?: boolean;
    columnDef: string;
    displayIndex?: number;
    cellType?: CellType.text | CellType.currency | CellType.date | CellType.time | CellType.dateTime | CellType.custom,
    options?: any;
}

export enum CellType {
    text = 'text',
    currency = 'currency',
    date = 'date',
    time = 'time',
    dateTime = 'dateTime',
    custom = 'custom'
}

export interface CurrencyOptions {
    unit: string;
}

export interface CustomComponent {
    componentName: string;
}

export interface TableSort {
    field: string;
    method: 'asc' | 'desc';
}

export interface TableFilter {
    field: string;
    method: 'equality' | 'range';
    parameters: string | number[];
}

export interface TableDataParams {
    pageSize: number;
    pageNumber: number;
    cursor: number;
    search: string;
    sort: TableSort[],
    filter: TableFilter[];
}
