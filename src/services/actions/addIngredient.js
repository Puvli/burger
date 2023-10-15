import { v4 as uuid4 } from 'uuid';

export const ADD_INGREDIENT = "ADD_INGREDIENT";

export const addIngredient = (item) => {
 const genId = uuid4();
    return {
        type: ADD_INGREDIENT,
        payload: {
            ...item, // используем `spread`, чтобы поменять ссылку на объект. Таким образом `redux` обновит его в хранилище
           uniqueId: genId // и добавляем в объект новое поле, которое потом будет использовано в `key`
        }
    }
}