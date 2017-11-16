import store from 'charlietableapp/src/store';

export const get = () => store.getState().services.session;
