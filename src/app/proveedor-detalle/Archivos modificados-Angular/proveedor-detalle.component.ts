import { Component, OnInit, Input } from '@angular/core'
import { Proveedor } from '../proveedor';
import { ProveedorService } from '../proveedor.service';
import { ProveedorDataSource } from '../proveedor-datasource';
import {BehaviorSubject, merge, Observable, of as observableOf} from 'rxjs';

@Component({
  selector: 'app-proveedor-detalle',
  templateUrl: './proveedor-detalle.component.html',
  styleUrls: ['./proveedor-detalle.component.css']
})
export class ProveedorDetalleComponent implements OnInit {

  @Input() proveedor?: Proveedor;
  resultsLength : number = 5;
  proveedores = new BehaviorSubject<Proveedor[]>([]);
  dataSource: ProveedorDataSource;
  
  constructor(private datosProveedor: ProveedorService) { }

  ngOnInit(): void {
  }

  actualizar(name: string, id: number): void
  {
    name = name.trim();


    var str = "hola ";
    console.log(this.proveedor.name);
    console.log(this.proveedor.id);

    alert(str.trim() + this.proveedor.name + "id: " + this.proveedor.id);

    var newProveedor = <Proveedor>{};

    newProveedor.id = id;
    newProveedor.name = name;
    newProveedor.type = "proveedor";
    newProveedor.saldo = 0;
    newProveedor.estado = "nuevo";

    if (!name) { return; }

    this.datosProveedor
      .getSize()
      .subscribe(id => this.resultsLength = id);

      this.datosProveedor.actualizaProveedor(newProveedor).subscribe(responseList => {
        this.proveedores = responseList[0];
        this.resultsLength = responseList[1];
    });

  }

}
