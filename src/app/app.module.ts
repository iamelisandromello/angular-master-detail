
import { NgModule }           from '@angular/core';
import { CoreModule }         from "./core/core.module";
import { AppRoutingModule }   from './app-routing.module';
import { AppComponent }       from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
