import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddassociateComponent } from '../addassociate/addassociate.component';

@Component({
  selector: 'app-associatelisting',
  templateUrl: './associatelisting.component.html',
  styleUrls: ['./associatelisting.component.css']
})
export class AssociatelistingComponent implements OnInit {
  constructor(private dialog:MatDialog){

  }
  ngOnInit(): void {
    
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
