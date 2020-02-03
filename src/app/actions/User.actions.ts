import { Action } from '@ngrx/store';
import { UserActionTypes } from './../shared/enums/user-action-types.enum';

export class ActionParent implements Action {
    type: UserActionTypes; // the kind of actions
    payload: any; // the data that will been passed
}

export class AddUser implements ActionParent {
    type = UserActionTypes.Add;
    constructor(public payload: any) { }


}
