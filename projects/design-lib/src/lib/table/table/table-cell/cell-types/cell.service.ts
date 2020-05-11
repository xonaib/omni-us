import { Type } from '@angular/core';
import { TextCellComponent } from './text-cell.component';
import { CellType } from '../../../../../Interfaces/table-interface';

export class CellService {

    private registeredCells: { [key: string]: Type<any>; } = {};

    registerCell(type: string, component: Type<any>) {
        this.registeredCells[type] = component;
    }

    getCell(type: string, options: any): Type<any> {
        const component = this.registeredCells[type];

        if (component == null && type === CellType.custom) {

            if (options && options.CustomComponent) {
                return options.CustomComponent;
            }
        }
        if (component == null) {
            return TextCellComponent;
        }

        return component;
    }
}
