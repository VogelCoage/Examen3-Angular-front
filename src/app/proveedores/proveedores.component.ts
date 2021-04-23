import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { Proveedor } from '../proveedor'
import { ProveedorService } from '../proveedor.service'
import { MatCard } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  selectedProveedor?: Proveedor;
  
  public proveedor = { name: "", id: 0 }
  proveedores:Proveedor[];
  
  constructor( private datosProveedor:ProveedorService) 
  { 
  }

  ngOnInit(): void {

    this.datosProveedor.getProveedores().subscribe((data: any[])=>{
      console.log(data);
      this.proveedores = data;
    })
    
  }

  onSelect(proveedor: Proveedor): void {
    this.selectedProveedor = proveedor;
  }

  

  agregar(name: string, id:number): void {
    name = name.trim();

    var newProveedor = <Proveedor>{};
    
    newProveedor.id=id;
    newProveedor.name=name;
    newProveedor.type="proveedor";
    newProveedor.saldo=0;
    newProveedor.estado= "nuevo";
    
    if (!name) { return; }
    this.datosProveedor.agregaProveedor(newProveedor)
      .subscribe(proveedor => {
        this.proveedores.push(proveedor);
      });
  }

}
