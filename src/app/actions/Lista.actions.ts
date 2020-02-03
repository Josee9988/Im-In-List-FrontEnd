import { Action } from '@ngrx/store';
import { ListaActionTypes } from './../shared/enums/lista-action-types.enum';

export class ActionParent implements Action {
    type: ListaActionTypes; // the kind of actions
    payload: any; // the data that will been passed
}

export class AddLista implements ActionParent {
    type = ListaActionTypes.Add;
    constructor(public payload: any) { }


}
