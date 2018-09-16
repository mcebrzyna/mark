import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
	selector: 'app-name-list',
	templateUrl: './name-list.component.html',
	styleUrls: ['./name-list.component.scss'],
})
export class NameListComponent implements AfterViewInit {
	@Output() onMarkPerson = new EventEmitter();

	public showed = false;
	public persons: any[] = [
		{
			name: 'Michał',
			surname: 'Cebrzyna',
		},
		{
			name: 'Mateusz',
			surname: 'Debina',
		},
		{
			name: 'Seba',
			surname: 'Hajdus',
		},
	];

	private keyListener: Subscription;
	private _activePerson: any;
	private index: number = 0;

	get activePerson(): any {
		return this._activePerson;
	}

	constructor() {
		this._activePerson = this.persons[this.index];
	}

	ngAfterViewInit() {
	}

	public show(): void {
		this.showed = true;
		this.keyListener = fromEvent(document, 'keydown')
			.subscribe((e: KeyboardEvent) => {
				switch (e.keyCode) {
					case 27: // esc
						this.hide();
						break;
					case 13: // enter
						e.preventDefault();
						this.onMarkPerson.emit(this._activePerson);
						break;
					case 40: // down
						this.down(e, this.index);
						break;
					case 38: // up
						this.up(e, this.index);
						break;
					default:
						return null;
				}
			});
	}

	public hide(): void {
		this.showed = false;
		this.index = 0;
		this._activePerson = this.persons[this.index];
		this.keyListener.unsubscribe();
	}

	public down(e, i): void {
		e.preventDefault();

		if (i === this.persons.length - 1) {
			this.index = 0;
			this._activePerson = this.persons[this.index];
		}
		else {
			this._activePerson = this.persons[++this.index];
		}
	}

	public up(e, i): void {
		e.preventDefault();

		if (i === 0) {
			this.index = this.persons.length - 1;
			this._activePerson = this.persons[this.index];
		}
		else {
			this._activePerson = this.persons[--this.index];
		}
	}
}
