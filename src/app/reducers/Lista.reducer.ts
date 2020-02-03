import { ListaActionTypes } from './../shared/enums/lista-action-types.enum';
import { ActionParent } from '../actions/Lista.actions';
import { Lista } from './../models/Listas.model';

// default lista state when not initialiced
export const initialState: Lista[] = [];

export function UserReducer(state = initialState, action: ActionParent) {
    switch (action.type) {
        case ListaActionTypes.Add: // Add list
            return [...state, action.payload];
        case ListaActionTypes.Delete: // remove list
            return [...state.splice(action.payload, 1)];

        default:
            return state;
    }
}
