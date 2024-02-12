import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AssociateService } from "src/app/service/associate.service";
import { loadassociate, loadassociatefail, loadassociatesuccess } from "./Associate.Action";
import { catchError, exhaustMap, of, map } from "rxjs";
@Injectable()
export class AssociateEffect{

    constructor(private actin$:Actions,private service:AssociateService){

    }

    _loadassociate = createEffect(()=>
    this.actin$.pipe(
        ofType(loadassociate),
        exhaustMap((action)=>{
            return this.service.GetAll().pipe(
                map((data)=>{
                    return loadassociatesuccess({list:data})
                }),
                catchError((_error)=>of(loadassociatefail({errorMessage:_error.message})))
            )
        })
    )
    )
}