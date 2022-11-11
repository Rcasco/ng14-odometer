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
    animation = 'slide';
    format = '(,ddd)';
    theme = 'default';
    value = 0;
    duration = 2000;
    auto = true;
}
