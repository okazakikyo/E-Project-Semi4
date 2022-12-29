/* eslint-disable  @typescript-eslint/no-explicit-any */
import { defineStore } from "pinia";
export type RootState = {
  errors: any;
};
export const useErrorStore = defineStore({
  id: "error",
  state: () =>
    ({
      errors: null,
    } as RootState),
  actions: {
    setError(errors: any) {
      this.errors = errors;
    },
    setEmptyError() {
      this.errors = null;
    }
  },
});
