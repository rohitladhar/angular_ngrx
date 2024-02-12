import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddassociateComponent } from '../addassociate/addassociate.component';
import { Store } from '@ngrx/store';
import { Associate } from 'src/app/Store/Model/Associate.model';
import { getassociatelist } from 'src/app/Store/Associate/Associate.Selectors';
import { loadassociate } from 'src/app/Store/Associate/Associate.Action';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-associatelisting',
  templateUrl: './associatelisting.component.html',
  styleUrls: ['./associatelisting.component.css']
})
export class AssociatelistingComponent implements OnInit {
  AssociateList!:Associate[];
  datasource:any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  displayedColumns : string[]=['code',"name","email","phone","address","type","group","status","action"]
  constructor(private dialog:MatDialog,private store:Store){

  }
  ngOnInit(): void {
    this.store.dispatch(loadassociate())
    this.store.select(getassociatelist).subscribe(item=>{
      this.AssociateList = item;
      this.datasource = new MatTableDataSource<Associate>(this.AssociateList)
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
  }

  FunctionAdd(){
    this.OpenPopup(0,'Create Associate');
  }

  OpenPopup(code:number, title:string){
    this.dialog.open(AddassociateComponent,{
      width:'50%',
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      data:{
        code:code,
        title:title
      }
    })
  }
}
