import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { GlobalService } from './globals.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyTableComponent } from './body-table/body-table.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
