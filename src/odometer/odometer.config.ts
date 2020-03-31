/**
 * Created by Jose Andres on 6.15.17
 */

export interface TmNgOdometerConfigModel {
    animation?: string;
    format?: string;
    theme?: string;
    value?: number;
    duration?: number;
    auto?: boolean;
}

export class TmNgOdometerConfig implements TmNgOdometerConfigModel {
    animation?: string = 'slide';
    format: string = '(,ddd)';
    theme?: string = 'default';
    value?: number = 0;
    duration?: number = 2000;
    auto?: boolean = true;
}
