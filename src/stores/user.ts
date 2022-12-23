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
  staffList: {},
  roomList: {},
};

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
      scheduleList: {},
      user: {},
      postList: {},
      userList: {},
      staffList: {},
      roomList: {},
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
          const response = await api.post<GenericResponse>(
            'login',
            user
          )
          console.log(response)
          this.user = response
          return this.user
        }catch(e) {
          console.log(e)
          storeError.setError(e)
        }
      },
      async getUser() {
        const storeError = useErrorStore();
        try {
          const response = await api.get<GenericResponse>(
            'user'
          )
          return response.data
        } catch(e) {
          storeError.setError(e)
        }
      },
      async createRoom(room : any) {
        try {
          const res = await api.post<GenericResponse>(
            'room-list',
            room
          )
          return res.data
        } catch (error) {
          console.log(error)
        }
      },
      async getRoomList() {
        try {
          const res = await api.get<GenericResponse>(
            'room-list',
          )
          this.roomList = res.data
          return this.roomList
        } catch (error) {
          console.log(error)
        }
      },
      async getRoomById(roomId: any) {
        try {
          const res = await api.get<GenericResponse>(
            `room-list/${roomId}`,
          )
          return res.data
        } catch (error) {
          console.log(error)
        }
      },
      async updateRoom(roomId: any, room: any) {
        try {
          const res = await api.put<GenericResponse>(
            `room-list/${roomId}`,
            room
          )
          return res.data
        } catch (error) {
          console.log(error)
        }
      },
      async getBookingList() {
        try {
          const res = await api.get<GenericResponse>(
            'booking-list'
          )
          return res.data
        } catch (error) {
          
        }
      },
      async getUserList() {
        try {
          const res = await api.get<GenericResponse>(
            'staff'
          )
          return res.data
        } catch (error) {
          
        }
      },
    },
})