
export interface FFColumnDef {
    header?: string;
    isSortable?: boolean;
    columnDef: string;
    displayIndex?: number;
    cellType?: CellType.text | CellType.select | CellType.currency | CellType.date | CellType.time | CellType.dateTime | CellType.custom
}

export enum CellType {
    text = 'text',
    select= 'select',
    currency = 'currency',
    date = 'date',
    time = 'time',
    dateTime = 'dateTime',
    custom = 'custom'
}
