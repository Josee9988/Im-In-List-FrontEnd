import { UserActionTypes } from './../shared/enums/user-action-types.enum';
import { ActionParent } from '../actions/User.actions';
import { User } from './../models/Users.model';


export const initialState: User[] = [];

export function UserReducer(state = initialState, action: ActionParent) {
    switch (action.type) {
        case UserActionTypes.Add: // Add user
            return [...state, action.payload];
            break;
        case UserActionTypes.Delete: // remove
            return [...state.splice(action.payload, 1)];
            break;

        default:
            return state;
            break;
    }
}
