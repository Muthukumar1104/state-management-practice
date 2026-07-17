import { authHandlers } from "./authHandlers";
import { productHandlers } from "./productHandlers";
import { userHandlers } from "./userHandlers";

export const handlers = [...authHandlers, ...userHandlers, ...productHandlers];