import { UserActionTypes } from './../shared/enums/user-action-types.enum';
import { ActionParent } from '../actions/User.actions';
import { User } from './../models/Users.model';

// default lista state when not initialiced
export const initialState: User[] = [];

export function UserReducer(state = initialState, action: ActionParent) {
    switch (action.type) {
        case UserActionTypes.Add: // Add user
            return [...state, action.payload];
        case UserActionTypes.Delete: // remove user
            return [...state.splice(action.payload, 1)];

        default:
            return state;
    }
}
