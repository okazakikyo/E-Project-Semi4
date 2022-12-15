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
  scheduleList: UserSchedule[]
};

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
      scheduleList: {},
    } as RootState),
    actions: {
      setUserSchedule(scheduleList: UserSchedule) {
        this.scheduleList = {
          ...scheduleList,
          ...this.scheduleList
        }
      },
      async getPost() {
        const storeError = useErrorStore();
        try {
          const { data } = await api.get<GenericResponse>(
            'posts'
          )
          console.log(data);
          return data
        }catch(e) {}
      }
    }
})