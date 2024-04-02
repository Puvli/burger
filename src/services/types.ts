import { ReactNode } from "react";
import {
  ADD_INGREDIENTS_SUCCESS,
  AUTH_SUCCESS,
  DELETE_INGREDIENTS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  MAKE_NEW_ORDER,
  POPUP_ORDER,
  REGISTRATION_SUCCESS,
  SET_IS_AUTH_CHECKED,
  UPDATE_SUCCESS,
} from "./actions/actions";
import {
  DRAG_INGREDIENT_TO_CONSTRUCTOR,
  DRAG_IN_CONSTRUCTOR,
} from "./actions/drag";

import { IWebsocketState } from "./socket/reducer";
import { GET_INGREDIENTS_SUCCESS } from "./actions/loadIngredients";
import {
  CURRENT_INGREDIENT,
  OPEN_MODAL_ORDER,
  REMOVE_CURRENT_INGREDIENT,
} from "./actions/modal";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_CONNECT } from "./socket/actions";

//reducers
interface AddIngredientsSuccessAction {
  type: typeof ADD_INGREDIENTS_SUCCESS;
  payload: IIngredient; // Замените any на более конкретный тип данных
}

interface DeleteIngredientsAction {
  type: typeof DELETE_INGREDIENTS;
  index: number;
}

interface SetIsAuthCheckedAction {
  type: typeof SET_IS_AUTH_CHECKED;
  payload: boolean;
}

interface DragIngredientToConstructorAction {
  type: typeof DRAG_INGREDIENT_TO_CONSTRUCTOR;
  bun?: IIngredient; // Замените any на более конкретный тип данных
  items?: IIngredient[]; // Замените any на более конкретный тип данных
}

interface DragInConstructorAction {
  type: typeof DRAG_IN_CONSTRUCTOR;
  index: number;
  drag: number;
}

export type AppActions =
  | AddIngredientsSuccessAction
  | DeleteIngredientsAction
  | SetIsAuthCheckedAction
  | DragIngredientToConstructorAction
  | DragInConstructorAction;

export interface IClickedIngredient {
  items: IIngredient[];
  bun: IIngredient | null;
}

export interface AppReducerState {
  clickedIngredient: IClickedIngredient;
  isAuthChecked: boolean;
}

//appheader
export interface INavLink {
  name: string;
  path: string;
  isActive: boolean;
  onClick?: void;
}

//burgerconstructor
export interface IBurgerComponentProps {
  item: IIngredient;
  index: number;
}

export interface IBurgerIngredientsStore {
  ingredients: AppReducerState;
}

export interface ICustomer {
  customer: ICustomerState;
}

export type TInfo = {
  onClick: void;
  price: number;
};

export interface IBurgerConstructor {
  onClick?: void;
  onDropHandler: (item: IIngredient) => void;
}

//burgeringredients
export interface IngredientsMenuProps {
  click: (type: string) => void;
  currentType: string;
  refs: {
    [key: string]: React.RefObject<HTMLDivElement>;
  };
}

export interface BurgerIngredientProps {
  element: {
    image: string;
    price: number;
    name: string;
    _id: string;
  };
  onOpen: (element: any) => void; // Уточните тип, если возможно
  addToOrder: (element: any) => void; // Уточните тип, если возможно
}

export interface IngredientsProps {
  title: string;
  onOpen: (element: any) => void;
  addToOrder: (element: any) => void;
  ingredients: IIngredient[];
}

export interface LoadedIngredients {
  buns: IIngredient[];
  sauces: IIngredient[];
  main: IIngredient[];
  all: IIngredient[];
}

export interface BurgerIngredientsProps {
  onOpen: (ingredient: IIngredient) => void;
  addToOrder: (ingredient: IIngredient) => void;
}

//card-history-order
export interface ImageProp {
  ingredient: IIngredient;
  count: number;
}

export interface CardHistoryOrderProps {
  name: string;
  number: number;
  timestamp: string;
  images: ImageProp[];
  status: "done" | "pending" | "created";
}

//card-order
export interface ImageProp {
  ingredient: IIngredient;
  count: number;
}

export interface CardOrderProps {
  name: string;
  number: number;
  timestamp: string;
  images: ImageProp[];
  status: string;
}

//ingredient-details
export interface State {
  loadedIngredients: {
    buns: IIngredient[];
    main: IIngredient[];
    sauces: IIngredient[];
  };
}

//modal
export interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

//modal-overlay
export interface ModalOverlayProps {
  children: ReactNode;
  onClick: () => void;
}

//order-details
export interface IOrderDetails {
  number: INewOrderState;
}

//protected-route
export interface ProtectedProps {
  onlyUnAuth?: boolean;
  component: ReactNode;
}

export interface IProtected {
  customer: ICustomerState;
}

//stats
export interface StatsProps {
  total: number;
  totalToday: number;
  anotherOrders: IUserOrders[];
}

//pages

//feed-order
export interface IFeedPopup {
  popup: boolean;
}

//feed
export interface IOrderData {
  createdAt: string;
  name: string;
  number: number;
  ingredients: string[];
}

export interface ISocket {
  socket: IWebsocketState;
}

export interface IResult {
  ingredient: IIngredient | null;
}

//home
export interface IModalInHome {
  modal: ModalState;
}

//profile
export interface IProfile {
  customer: ICustomerState;
}

//sercices/actions
//actions.ts
export interface MakeNewOrderPayload {
  ingredients: string[];
}

//reducers
//customerReducer
export interface ICustomerState {
  name: string;
  email: string;
  isAuthChecked: boolean;
}

export interface IAuthSuccessAction {
  type:
    | typeof AUTH_SUCCESS
    | typeof LOGIN_SUCCESS
    | typeof REGISTRATION_SUCCESS
    | typeof UPDATE_SUCCESS;
  payload: {
    name: string;
    email: string;
  };
}

export interface ISetIsAuthCheckedAction {
  type: typeof SET_IS_AUTH_CHECKED;
  payload: boolean;
}

export interface ILogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

export type CustomerAction =
  | IAuthSuccessAction
  | ISetIsAuthCheckedAction
  | ILogoutSuccessAction;

//loadIngredients
export interface IGetIngredientsSuccessAction {
  type: typeof GET_INGREDIENTS_SUCCESS;
  payload: IIngredient[];
}

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  uniqueId: string;
}

export interface ILoadIngredientsState {
  buns: IIngredient[];
  main: IIngredient[];
  sauces: IIngredient[];
  all: IIngredient[];
}

//makeNewOrder
export interface IMakeNewOrderAction {
  type: typeof MAKE_NEW_ORDER;
  payload: {
    number: number;
  };
}

export interface INewOrderState {
  number: number | null;
}

export interface OpenModalOrderAction {
  type: typeof OPEN_MODAL_ORDER;
}

export interface CurrentIngredientAction {
  type: typeof CURRENT_INGREDIENT;
  current: IIngredient;
}

export interface RemoveCurrentIngredientAction {
  type: typeof REMOVE_CURRENT_INGREDIENT;
}

export type ModalActionTypes =
  | OpenModalOrderAction
  | CurrentIngredientAction
  | RemoveCurrentIngredientAction;

export interface ModalState {
  isOpen: boolean;
  current?: IIngredient;
}

// Определение интерфейса для типов экшенов в socket-middleware
export interface WsActions {
  wsConnect: string;
  wsSendMessage: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
  wsDisconnect: string;
  wsConnecting: string;
}
//socketmiddleware actions
export interface IConnect {
  type: typeof WS_CONNECTION_CONNECT;
  payload: string;
}

export interface IDisconnect {
  type: typeof WS_CONNECTION_CLOSED;
}

export interface IUserOrders {
    createdAt: string;
    name: string;
    number: number;
    ingredients: string[];
    status: "done" | "pending";
  }
  
  export interface doneOrders {
    success: boolean;
    orders: IUserOrders[];
    total: number;
    totalToday: number;
    message: string;
  }

  //reducers/orderData
  export interface IElem {
    // ingredients: ICountIngredients[];
    ingredients: string[];
    name: string;
    createdAt: string;
    status: string;
  }
  
  export interface OrderState {
    orderData: {
      orders: IIngredient[];
      success: boolean;
    };
    elem: IElem;
    popupSuccess?: boolean;
  }
  
  export interface PoupOrderAction {
    type: typeof POPUP_ORDER;
    payload: {
      orders: IIngredient[];
      success: boolean;
    };
  }
