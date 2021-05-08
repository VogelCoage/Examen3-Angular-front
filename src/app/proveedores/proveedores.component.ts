import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { Proveedor } from '../proveedor';
import { tap } from 'rxjs/operators';
import {BehaviorSubject, merge, Observable, of as observableOf} from 'rxjs';
import { ProveedorService } from '../proveedor.service';
import { ProveedorDataSource } from '../proveedor-datasource';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements AfterViewInit, OnInit {

  dataSource: ProveedorDataSource;

  displayedColumns: string[] = ['id', 'name'];
  exampleDatabase: ProveedorService | null;
  proveedores = new BehaviorSubject<Proveedor[]>([]);
  userData:Observable<Proveedor[]>;

  resultsLength : number = 5;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selectedProveedor?: Proveedor;
  
  public proveedor = { name: "", id: 0 }

  //proveedores:Proveedor[];
  
  constructor(private datosProveedor:ProveedorService) 
  { 
    this.datosProveedor
      .getSize()
      .subscribe(id => this.resultsLength = id);
  }

  ngOnInit(): void {

    this.dataSource = new ProveedorDataSource(this.datosProveedor);
    this.dataSource.cargaProveedores(1, 0, 3);

    this.datosProveedor
      .getSize()
      .subscribe(id => this.resultsLength = id);

      console.log("size:  " + this.resultsLength);

    /*this.datosProveedor.getProveedores().subscribe((data: any[])=>{
      console.log(data);
      this.proveedores = data;
    })*/
    
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

    this.datosProveedor
      .getSize()
      .subscribe(id => this.resultsLength = id);

      this.datosProveedor.agregaProveedor(newProveedor).subscribe(responseList => {
        this.proveedores = responseList[0];
        this.resultsLength = responseList[1];
    });

    this.cargaProveedoresPage();

    /*this.datosProveedor.agregaProveedor(newProveedor)
      .subscribe(proveedor => {
        this.proveedores.push(proveedor);
      });*/
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }

  onRowClicked(row) {

    if(this.selectedProveedor === undefined)  
       this.selectedProveedor = <Proveedor>{};

    this.selectedProveedor.name = row.name;
    this.selectedProveedor.id = row.id;
    console.log('Row clicked: ', row);
  }

  ngAfterViewInit() { 

    this.paginator.page
            .pipe(
                tap(() => this.cargaProveedoresPage())
            )
            .subscribe();
            
    console.log("proveedores:  " + this.proveedores);
    console.log("datasource:  " + this.dataSource);
  }

  cargaProveedoresPage() {
    this.dataSource.cargaProveedores(1,
      this.paginator.pageIndex,
      this.paginator.pageSize);
      console.log("cargaProveedoresPage():proveedores:  "+this.proveedores);
  }

}
