# TmNgOdometer [![npm version](https://img.shields.io/npm/v/tm-ng-odometer.svg?style=flat)](https://www.npmjs.com/package/tm-ng-odometer) [![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

### Powered by: Marco Trinastich

Odometer for [Angular 9]() that wraps on my decimal fixed version of HubSpot's Odometer: [NPM](https://www.npmjs.com/package/tm-odometer)/[GitHub](https://github.com/mtmarco87/odometer/)


### NOTE: 
I have created this Angular 9 version starting from the existing Ng2Odometer by Jose Andres.
In this version I have upgraded the whole library to Angular 9, and I have included my fixed implementation of Hubspot's Odometer that contains an useful fix: the decimal precision passed in input to the component is now preserved during and after the animation, thus making visible also the zeroes at the end of an integer number (e.g. with a precision of 2, 1200 will be displayed as 1200.00).


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

## Info
I have improved and updated the following original npm packages:

### HubSpot's Odometer
GitHub: [http://github.hubspot.com/odometer/docs/welcome/](http://github.hubspot.com/odometer/docs/welcome/)

### Ng2-Odometer
NPM: [https://www.npmjs.com/package/ng2-odometer/](https://www.npmjs.com/package/ng2-odometer/) (credits: Jose Andres)


## Quick Start

```
npm install tm-ng-odometer --save
```

## Table of contents

- [Setup](#setup)
- [Usage](#usage)
- [Configuration](#configuration)
- [Demo](#demo)

## Setup

First you need to install the npm module:
```sh
npm install tm-ng-odometer --save
```

Then add the `TmNgOdometerModule` to the imports array of your application module.

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TmNgOdometerModule } from 'tm-ng-odometer'; // <-- import the module
import { AppComponent} from './app.component';

@NgModule({
    imports: [
      BrowserModule, 
      TmNgOdometerModule // <-- include it in your app module
    ], 
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
    //
}
```

## Usage 

Use the `<tm-ng-odometer></tm-ng-odometer>` component to create an odometer. The `number` is required attribute. 
The `number` represents the limit at which the odometer will travel. The `config` an object with the configuration properties, this is NOT required. 

```js
@Component({
   selector: 'main-element',
   template: `
        ...
        <tm-ng-odometer [number]="number" [config]="{ }"></tm-ng-odometer>
        <!-- Further content here -->
        ...
   `
})
export class MainElementComponent {
  public number: number = 1000;
}
```

When on manual mode (`[config]="{ auto: false }"`), you can update the `number` attribute and that will trigger an odometer update right away. The `observable` is an Observable which will be used as a trigger for the odometer when on manual mode. 

```js
@Component({
   selector: 'main-element',
   template: `
        ...
        <tm-ng-odometer [number]="number" [config]="{ auto: false }" [observable]="observable"></tm-ng-odometer>
        <!-- Further content here -->
        ...
   `
})
export class MainElementComponent {
  public number: number = 1000;
  public observable: Observable<boolean>;
  private observer: Observer<boolean>;
  
  constructor() {
    this.observable = new Observable<boolean>((observer: any) => this.observer = observer).pipe(share());

    // Trigger odometer after 2s
    setTimeout(() => this.observer.next(true), 2000);
  }
}
```

## Configuration

The component accepts either a `[config]="{ ... }"` attribute with an object with all the configurable attribues or independent attributes for each configuration.

| Option        | Type      | Default     | Description   |
| --------------| --------- | ----------- |-------------- |
| `animation`   | string    | 'slide'     | Animation effect type. <br> Options: 'slide', 'count'
| `format`      | string    | '(,ddd)'    | Format to apply on the numbers. <br> Format - Example: <br> (,ddd) - 12,345,678 <br> (,ddd).dd - 12,345,678.09 <br> (.ddd),dd - 12.345.678,09 <br> ( ddd),dd - 12 345 678,09 <br> d         -  12345678
| `theme`       | string    | 'default'   | The desired theme. <br> Options: 'default', 'minima', 'digital', 'car', 'plaza', 'slot-machine', 'train-station'
| `value`       | number    | 0           | Initial value of the odometer
| `auto`        | boolean   | true        | Setup auto or manual mode for the odometer

```js
@Component({
   selector: 'main-element',
   template: `
        ...
        <tm-ng-odometer 
            [number]="1000" 
            [observable]="observable" 
            [config]="config"></tm-ng-odometer>
        <!-- Further content here -->

        <tm-ng-odometer 
            [number]="1000" 
            [observable]="observable"
            [config]="{ animation: 'count', format: 'd', theme: 'car', value: 50, auto: false }">
        </tm-ng-odometer>
        <!-- Further content here -->

        <tm-ng-odometer 
            [number]="1000"  
            [observable]="observable"
            [animation]="'count'"
            [format]="'d'"
            [theme]="'car'"
            [value]="0",
            [auto]="false">
        </tm-ng-odometer>
        <!-- Further content here -->
        ...
   `
})
export class MainElementComponent {
    public config = {
        animation: 'count', 
        format: 'd', 
        theme: 'car', 
        value: 50,
        auto: true,
    }

    ...
}
```

If you add both, the `[config]` and any independent configuration, the independent config will overwrite the `[config]` object.

## Demo

The [demo](demo) subfolder contains a project created with angular-cli that has been adapted to showcase the functionality of tm-ng-odometer.
To execute the code follow this steps:

```
// Go the the demo folder
cd demo

// Install dependencies
npm install / yarn install

// Run the server
ng serve
```

Then go to [http://localhost:4200](http://localhost:4200/) to check the demo running.

## DONE:

* Update to Angular 9
* Fixed decimal precision issues in Odometer original library

## TODO:

* Add tests to the library and demo
* Add new themes
* Create a Directive also

## License

[MIT](LICENSE)
