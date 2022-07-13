import { Route } from "../models";

import { Controller } from "../utils";

const controller = new Controller("route", Route);

export const add = controller.add();

export const all = controller.all();

export const del = controller.del();

export const get = controller.get();

export const set = controller.set();
