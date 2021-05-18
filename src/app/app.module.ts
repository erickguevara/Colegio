import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarComponent } from './agregar/agregar.component';
import { InicioComponent } from './inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AgregarComponent,
    InicioComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ErrorTailorModule.forRoot({
      errors: {
        useValue: {
          required: 'Campo es Requerido',
          minlength: ({ requiredLength, actualLength }) => 
                      `Expect ${requiredLength} but got ${actualLength}`,
          invalidAddress: error => `Address isn't valid`
        }
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
