import { v4 as uuid4 } from 'uuid';
import { ADD_INGREDIENTS_SUCCESS } from './actions';
export const ADD_INGREDIENT = "ADD_INGREDIENT";

export const addIngredient = (item) => {
 const genId = uuid4();
    return {
        type: ADD_INGREDIENTS_SUCCESS,
        payload: {
            ...item, // используем `spread`, чтобы поменять ссылку на объект. Таким образом `redux` обновит его в хранилище
           uniqueId: genId // и добавляем в объект новое поле, которое потом будет использовано в `key`
        }
    }
}