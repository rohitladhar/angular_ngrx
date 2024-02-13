import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AssociateService } from "src/app/service/associate.service";
import { addassociate, addassociatesuccess, deleteassociate, deleteassociatesuccess, getassociate, getassociatesuccess, loadassociate, loadassociatefail, loadassociatesuccess, updateassociate, updateassociatesuccess } from "./Associate.Action";
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
                        showalert({message:'Created Successfully', resulttype:'pass'})
                        return of(addassociatesuccess({ inputdata: action.inputdata }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to create associate'+ _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _updateassociate = createEffect(() =>
        this.actin$.pipe(
            ofType(updateassociate),
            switchMap((action) => {
                return this.service.Update(action.inputdata).pipe(
                    switchMap((data) => {
                        showalert({message:'Updated Successfully', resulttype:'pass'})
                        return of(updateassociatesuccess({ inputdata: action.inputdata }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to Update associate'+ _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _deleteassociate = createEffect(() =>
        this.actin$.pipe(
            ofType(deleteassociate),
            switchMap((action) => {
                return this.service.Delete(action.code).pipe(
                    switchMap((data) => {
                        return of(deleteassociatesuccess({ code: action.code }),
                            showalert({ message: 'Deleted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to delete associate', resulttype: 'fail' })))
                )
            })
        )
    )

    _getassociate = createEffect(() =>
        this.actin$.pipe(
            ofType(getassociate),
            exhaustMap((action) => {
                return this.service.Getbycode(action.id).pipe(
                    map((data) => {
                        return getassociatesuccess({ obj: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )
}