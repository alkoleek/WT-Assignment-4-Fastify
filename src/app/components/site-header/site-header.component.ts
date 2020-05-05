/*
  Student: Maxime DROUIN
  Student number: 3008951
 */

import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
    selector: 'app-site-header',
    templateUrl: './site-header.component.html',
    styleUrls: ['./site-header.component.scss'],
})
export class SiteHeaderComponent implements OnInit {
    @ViewChild('header', {read: ElementRef, static: true}) header: ElementRef;
    @Input() border = false;
    @Input() center = true;
    @Input() title = 'Taskify';

    constructor(private renderer: Renderer2) {
    }

    ngOnInit() {
        if (!this.border) {
            this.renderer.addClass(this.header.nativeElement, 'ion-no-border');
        }

        if (this.center) {
            this.renderer.addClass(this.header.nativeElement, 'ion-text-center');
        }
    }
}
