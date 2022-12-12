import { defineStore } from 'pinia'
import type {
  User,
  UserLogin,
  UserSchedule,
} from '@/http/type'

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
    }
})