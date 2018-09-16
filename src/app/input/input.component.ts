import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {NameListComponent} from '../name-list/name-list.component';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
	@ViewChild(NameListComponent) protected nameListComponent: NameListComponent;

	private firstClick: boolean = true;
	private offset: number;
	private actualAt: number;
	private actualIndex: number;
	private actualText: string;

	public sections: any[] = [
		{
			type: 'text',
			text: 'Napisz co myślisz...',
		},
	];

	@HostListener('keypress', ['$event']) onKeyPress(ev) {
		this.syncAll();
	}

	// @HostListener('click') onClick() {
	// 	if (this.firstClick) {
	// 		window.getSelection().anchorNode.parentNode.innerText = '';
	//
	// 		this.firstClick = false;
	// 	}
	//
	// 	this.syncAll();
	// }

	constructor() { }

	ngOnInit() {
	}

	public syncAll(): void {
		setTimeout(() => {
			const spanElement = window.getSelection().anchorNode.parentNode;
			const text: string = spanElement.innerText;

			this.actualText = text;
			this.actualIndex = this.indexInParent(spanElement.parentNode);
			this.actualAt = 0;
			this.offset = window.getSelection().focusOffset;
			this.sections[this.actualIndex].text = text;

			this.checkActualAt(text);
			this.togglePeopleList(text);
		}, 1);
	}

	public addNewMark(newPerson): void {
		const newText = this.actualText.slice(this.offset);
		window.getSelection().anchorNode.parentNode.innerText = this.actualText.slice(0, this.actualAt);

		// add new span with person
		this.sections.splice(this.actualIndex + 1, 0, {
			type: 'user',
			text: `${newPerson.name} ${newPerson.surname}`,
		});

		// add new span with text after mark
		this.sections.splice(this.actualIndex + 2, 0, {
			type: 'text',
			text: newText.length !== 0 ? ` ${newText}` : '\xa0',
		});

		this.syncAll();
	}

	public indexInParent(node: Node): number {
		const children = node.parentNode.childNodes;
		let num = 0;
		for (let i = 0; i < children.length; i++) {
			if (children[i] === node) {
				return num;
			}
			if (children[i].nodeType === 1) {
				num++;
			}
		}
		return -1;
	}

	public checkActualAt(text: string): void {
		text.split('').forEach((el, i) => {
			if (el === '@') {
				if (
					this.offset - this.actualAt >= this.offset - i
					&& this.offset - i > 0
				) {
					this.actualAt = i;
				}
			}
		});
	}

	public togglePeopleList(text: string): void {
		const regExp: RegExp = /^(\s\@[\w]+\s?([\w]+)?)$/;

		if (regExp.test(text.slice(this.actualAt - 1, this.offset))) {
			!this.nameListComponent.showed && this.nameListComponent.show();
		}
		else {
			this.nameListComponent.showed && this.nameListComponent.hide();
		}
	}
}
