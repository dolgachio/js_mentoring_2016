'use strict';

const todo = (state, action) => {
    let payload = action.payload;

    switch(action.type) {
        case 'ADD_tODO':
            return {
                id: payload.id,
                title: payload.title,
                completed: false
            };

        case 'TOGGLE_TODO':
            if(state.id !== action.id) {
                return state;
            }

            return Object.assign({},
                state,
                {completed: !state.completed}
            );

        default:
            return state;
    }
};

export default todo;
