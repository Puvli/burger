import {
  useDispatch,
  useSelector,
  useStore,
  TypedUseSelectorHook,
} from "react-redux";
import { Dispatch } from "redux";
import {
  AppReducerState,
  ICustomerState,
  ILoadIngredientsState,
  INewOrderState,
  ModalState,
  OrderState,
} from "../types";
import { IWebsocketState } from "../socket/reducer";

//dispatch
type Action = { type: string; payload: any };

export type AppDispatch = Dispatch<Action> &
  ((asyncFunction: (dispatch: AppDispatch) => Promise<void>) => Promise<void>);

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

//selector
interface AppState {
  ingredients: AppReducerState;
  modal: ModalState;
  number: INewOrderState;
  loadedIngredients: ILoadIngredientsState;
  customer: ICustomerState;
  socket: IWebsocketState;
  orderPopupData: OrderState;
}

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
