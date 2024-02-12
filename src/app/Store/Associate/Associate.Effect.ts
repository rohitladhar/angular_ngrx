import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AssociateService } from "src/app/service/associate.service";
import { addassociate, addassociatesuccess, loadassociate, loadassociatefail, loadassociatesuccess } from "./Associate.Action";
import { catchError, exhaustMap, of, map, switchMap } from "rxjs";
import { showalert } from "../Common/App.Action";
@Injectable()
export class AssociateEffect {

    constructor(private actin$: Actions, private service: AssociateService) {

    }

    _loadassociate = createEffect(() =>
        this.actin$.pipe(
            ofType(loadassociate),
            exhaustMap((action) => {
                return this.service.GetAll().pipe(
                    map((data) => {
                        return loadassociatesuccess({ list: data })
                        showalert({message:'Created Successfully', resulttype:'pass'})
                    }),
                    catchError((_error) => of(loadassociatefail({ errorMessage: _error.message })))
                )
            })
        )
    )
    _addassociate = createEffect(() =>
        this.actin$.pipe(
            ofType(addassociate),
            switchMap((action) => {
                return this.service.Create(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(addassociatesuccess({ inputdata: action.inputdata }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to create associate', resulttype: 'fail' })))
                )
            })
        )
    )
}