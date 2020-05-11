
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
