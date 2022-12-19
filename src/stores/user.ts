import { defineStore } from 'pinia'
import { api } from "@/http/api";
import type {
  User,
  UserLogin,
  UserSchedule,
  GenericResponse,
} from '@/http/type'
import { useErrorStore } from "@/stores/errors";

export type RootState = {
  scheduleList: UserSchedule[],
  user: {},
  postList: {},
  userList: {},
};

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
      scheduleList: {},
      user: {},
      postList: {},
      userList: {},
    } as RootState),
    actions: {
      setUserSchedule(scheduleList: UserSchedule) {
        this.scheduleList = {
          ...scheduleList,
          ...this.scheduleList
        }
      },
      async login(user: any) {
        const storeError = useErrorStore();
        try {
          const { data } = await api.post<GenericResponse>(
            'login',
            user
          )
          console.log(data)
          this.user = data
          return this.user
        }catch(e) {
          storeError.setError(e)
        }
      },
      async getUser() {
        const storeError = useErrorStore();
        try {
          const response = await api.get<GenericResponse>(
            'user'
          )
          this.userList = response.data
          return this.userList
        } catch(e) {
          storeError.setError(e)
        }
      }
    },
})