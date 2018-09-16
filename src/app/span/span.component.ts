import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
	selector: 'app-span',
	templateUrl: './span.component.html',
	styleUrls: ['./span.component.scss'],
})
export class SpanComponent implements AfterViewInit {
	@ViewChild('textArea') private textArea: ElementRef;

	@Input() public type;
	@Input() public textStart;

	constructor() {
	}

	ngAfterViewInit() {
		this.textArea.nativeElement.innerText = this.textStart;
	}
}
