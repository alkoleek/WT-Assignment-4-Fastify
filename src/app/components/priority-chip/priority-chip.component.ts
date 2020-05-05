/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {PriorityChipColor} from './PriorityChipColor';

@Component({
    selector: 'app-priority-chip',
    templateUrl: './priority-chip.component.html',
    styleUrls: ['./priority-chip.component.scss'],
})
export class PriorityChipComponent implements OnInit {
    // tslint:disable-next-line:variable-name
    _value = 0;
    @ViewChild('main', {read: ElementRef, static: true}) main: ElementRef;
    @Input() colors: Array<PriorityChipColor> = [
        {
            color: 'red'
        },
        {
            color: '#FEFBC5'
        },
        {
            color: '#FDFAB2'
        },
        {
            color: '#FCF88B'
        },
        {
            color: '#FBF565'
        },
        {
            color: 'var(--ion-color-tertiary)'
        }
    ];

    @Input() set value(val: number) {
        this.setValue(val);
    }

    constructor(private renderer: Renderer2) {
    }

    ngOnInit() {
        this.setValue(this._value);
    }

    setValue(val: number) {
        this._value = val;

        if (this._value >= this.colors.length) {
            this._value = this.colors.length - 1;
        }

        if (this._value < 0) {
            this._value = 0;
        }
        this.renderer.setStyle(this.main.nativeElement, 'background', this.colors[this._value].color);
    }
}
