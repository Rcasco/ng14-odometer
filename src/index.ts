/**
 * Updated by Marco Trinastich on 31.03.20
 * Created by Jose Andres on 02.23.17
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmNgOdometerComponent } from './odometer';

@NgModule({
    imports: [CommonModule],
    declarations: [TmNgOdometerComponent],
    exports: [TmNgOdometerComponent]
})
export class TmNgOdometerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TmNgOdometerModule
        };
    }
}
