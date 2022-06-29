import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

export interface State {
  overlay: number;
}

export const state: State = {
  overlay: 0,
}

export const actions: ActionTree<State, any> = {
  add({ commit }) {
    commit('add', 1);
  },
  remove({ commit }) {
    commit('remove', 1);
  },
};

export const getters: GetterTree<State, any> = {
  display: ({ overlay }: State) => !!overlay,
};

export const mutations: MutationTree<State> = {
  add(state: State, value: number) {
    state.overlay += value;
  },
  remove(state: State, value: number) {
    state.overlay -= value;
  },
};

const namespaced = true;

export const module: Module<State, any> = { namespaced, state, getters, mutations, actions };

export default module;
