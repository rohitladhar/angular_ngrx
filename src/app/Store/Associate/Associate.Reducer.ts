import { createReducer, on } from "@ngrx/store";
import { AssociateState } from "./Associate.State";
import { addassociatesuccess, loadassociatefail, loadassociatesuccess } from "./Associate.Action";

const _AssociateReducer = createReducer(AssociateState,
    on(loadassociatesuccess,(state,action)=>{
       return{
        ...state,
        list:[...action.list],
        errorMessage:''
       } 
    }),
    on(loadassociatefail,(state,action)=>{
        return{
         ...state,
         list:[],
         errorMessage:action.errorMessage
        } 
    }),
    on(addassociatesuccess,(state,action)=>{
        const maxid = Math.max(...state.list.map(o=>o.id))
        const _newData = {...action.inputdata}
        _newData.id = maxid
        return{
         ...state,
         list:[...state.list,_newData],
         errorMessage:''
        } 
    })
)
export function AssociateReducer(state:any,action:any){
   return _AssociateReducer(state,action)
}