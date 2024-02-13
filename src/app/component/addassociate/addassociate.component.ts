import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addassociate } from 'src/app/Store/Associate/Associate.Action';
import { Associate } from 'src/app/Store/Model/Associate.model';
import { getassociate } from 'src/app/Store/Associate/Associate.Selectors';
@Component({
  selector: 'app-addassociate',
  templateUrl: './addassociate.component.html',
  styleUrls: ['./addassociate.component.css']
})
export class AddassociateComponent implements OnInit{
  title = 'Create Associate';
  isedit = false;
  dialogdata:any;
  constructor(private builder:FormBuilder,private ref:MatDialogRef<AddassociateComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,private store:Store){

  }
  ngOnInit(): void {
    this.dialogdata = this.data;
    this.title = this.dialogdata.title;
    this.store.select(getassociate).subscribe(res => {
      this.associateForm.setValue({
        id: res.id, name: res.name, email: res.email, phone: res.phone,
        address: res.address, group: res.associategroup, type: res.type, status: res.status
      })
    })
  }

  ClosePopup(){
    this.ref.close()
  }

 
  associateForm = this.builder.group({
    id:this.builder.control(0),
    name:this.builder.control('',Validators.required),
    email:this.builder.control('',Validators.compose([Validators.required,Validators.email]),),
    phone:this.builder.control('',Validators.required),
    address:this.builder.control('',Validators.required),
    type:this.builder.control('CUSTOMER'),
    group:this.builder.control('level1'),
    status:this.builder.control(true),
  })

  SaveAssociate(){
    if(this.associateForm.valid){
      const obj:Associate={
        id:this.associateForm.value.id as number,
        name:this.associateForm.value.name as string,
        email:this.associateForm.value.email as string,
        phone:this.associateForm.value.phone as string,
        associategroup :this.associateForm.value.group as string,
        address:this.associateForm.value.address as string,
        type:this.associateForm.value.type as string,
        status:this.associateForm.value.status as boolean
      }
      this.store.dispatch(addassociate({inputdata:obj}))
      this.ClosePopup()
    }
  }
}
