// tslint:disable-next-line: no-reference
///<reference path="odometer.d.ts" />

/**
 * Updated by Marco Trinastich on 03.31.20
 * Created by Jose Andres on 6.15.17
 */

import * as lodash from 'lodash';
import { Component, ViewEncapsulation, Input, OnInit, OnDestroy,
  OnChanges, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { OdometerModel } from './odometer.model';
import { TmNgOdometerConfig, TmNgOdometerConfigModel } from './odometer.config';
import {
    CAR_THEME,
    DEFAULT_THEME,
    DIGITAL_THEME,
    MINIMAL_THEME,
    PLAZA_THEME,
    SLOT_MACHINE_THEME,
    TRAIN_STATION_THEME,
 } from './themes';

// Tm-Odometer / fixed version of the original HubSpot's Odometer
// https://github.com/HubSpot/odometer
const Odometer = require('tm-odometer');

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'tm-ng-odometer',
    encapsulation: ViewEncapsulation.None,
    styles: [
        CAR_THEME,
        DEFAULT_THEME,
        DIGITAL_THEME,
        MINIMAL_THEME,
        PLAZA_THEME,
        SLOT_MACHINE_THEME,
        TRAIN_STATION_THEME,
        `
            .odometer,
            .odometer-inside,
            .odometer-digit,
            .odometer-digit-spacer,
            .odometer-digit-inner,
            .odometer-ribbon,
            .odometer-ribbon-inner,
            .odometer-value,
            .odometer-formatting-mark {
                color: inherit;
                font-size: inherit;
                font-family: inherit;
            }
        `,
    ],
    template: `<div #container></div>`
})
export class TmNgOdometerComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
    private subscription: Subscription;
    private odometer: OdometerModel;
    @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;
    @Input() number: number; // Required
    @Input() config: TmNgOdometerConfigModel = {};
    @Input() observable: Observable<boolean> = undefined;

    // Individual configuration attributes
    @Input() animation: string = undefined;
    @Input() format: string = undefined;
    @Input() theme: string = undefined;
    @Input() value: number = undefined;
    @Input() duration: number = undefined;
    @Input() auto: boolean = undefined;

    // Available themes
    private themes: Array<string> = [
        'car',
        'default',
        'digital',
        'minimal',
        'plaza',
        'slot-machine',
        'train-station'
    ];

    // Start Odometer
    private initOdometer() {
        if (!lodash.isUndefined(this.container)
            && typeof Odometer !== 'undefined') {

            this.odometer = new Odometer({
                el: this.container.nativeElement,
                animation: this.config.animation,
                value: this.config.value,
                duration: this.config.duration,
                format: this.config.format,
                theme: this.config.theme,
            });

            if (!lodash.isUndefined(this.number) && this.config.auto) {
                this.odometer.update(this.number);
            }
        }
    }

    private initConfig() {
        this.config = lodash.defaults(this.config, new TmNgOdometerConfig());

        // Animation
        if (!lodash.isUndefined(this.animation)) {
            this.config.animation = this.animation;
        }

        // Format
        if (!lodash.isUndefined(this.format)) {
            this.config.format = this.format;
        }

        // Theme
        if (!lodash.isUndefined(this.theme)) {
            this.config.theme = !lodash.includes(this.themes, this.theme) ? 'default' : this.theme;
        }

        // Value
        if (!lodash.isUndefined(this.value)) {
            this.config.value = this.value;
        }

        // Duration
        if (!lodash.isUndefined(this.duration)) {
            this.config.duration = this.duration;
        }

        // Auto
        if (!lodash.isUndefined(this.auto)) {
            this.config.auto = this.auto;
        }

        // Validate theme. If not part of the
        // available themes array, use the default
        if (!lodash.includes(this.themes, this.config.theme)) {
            this.config.theme = 'default';
        }
    }

    // ***************************************
    //  LIFECYCLES
    // ***************************************

    public ngOnInit() {

        // Bind Observable
        if (!lodash.isUndefined(this.observable) && !this.config.auto) {
            this.subscription = this.observable.subscribe((trigger: boolean) => {
                if (!lodash.isUndefined(trigger) && trigger) {
                    this.odometer.update(this.number);
                }
            });
        }

        // Apply defaults and
        // individual configurations
        this.initConfig();
    }

    public ngOnDestroy() {
        if (!lodash.isUndefined(this.subscription)) {
            this.subscription.unsubscribe();
        }
    }

    public ngOnChanges() {
        if (!lodash.isUndefined(this.number) && !lodash.isUndefined(this.odometer) && this.config.auto) {
            this.odometer.update(this.number);
        }
    }

    public ngAfterViewInit() {
        this.initOdometer();
    }
}
