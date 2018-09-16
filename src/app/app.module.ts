import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NameListComponent } from './name-list/name-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { SpanComponent } from './span/span.component';

@NgModule({
	declarations: [
		AppComponent,
		NameListComponent,
		InputComponent,
		SpanComponent,
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {
}
