import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ProveedorService } from './proveedor.service'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProveedorDetalleComponent } from './proveedor-detalle/proveedor-detalle.component';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

const MaterialComponents = [ 
  MatButtonModule
];

@NgModule({
  declarations: [
    AppComponent,
    ProveedoresComponent,
    ProveedorDetalleComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [ProveedorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
