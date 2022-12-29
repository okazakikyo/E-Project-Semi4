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
  loginData: {},
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
      loginData: {},
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
          this.loginData = response.data
          if(this.loginData.user.role == "admin") {
            localStorage.setItem('user', JSON.stringify(this.loginData))
            return this.loginData
          } else {
            storeError.setError("Admin account only, please try again!")
          }
        }catch(e) {
          if(e.response.status == 400) {
            storeError.setError("Invalid email or password!")
          } else {
            storeError.setError(e.message)
          }
        }
      },
      async register(user: any) {
        const storeError = useErrorStore();
        try {
          const response = await api.post<GenericResponse>(
            'register',
            user
          )
          localStorage.setItem('user', JSON.stringify(response.data))
        }catch(e) {
          if(e.response.status == 400) {
            storeError.setError("Faield to create account, check your email again!")
          } else {
            storeError.setError(e.message)
          }
        }
      },
      async getUser(userId: any) {
        const storeError = useErrorStore();
        try {
          const response = await api.get<GenericResponse>(
            `users/${userId}`,
            
          )
          return response.data
        } catch(e) {
          storeError.setError(e)
        }
      },
      async updateUser(userId: any, user: any) {
        try {
          const res = await api.put<GenericResponse>(
            `users/${userId}`,
            user
          )
          return res.data
        } catch (error) {
          console.log(error)
        }
      },
      async getListUser() {
        const storeError = useErrorStore();
        try {
          const res = await api.get<GenericResponse>(
            'users'
          )
          this.user = res.data
          return this.user
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
      async bookRoom(room: any) {
        try {
          const res = await api.post<GenericResponse>(
            'booking-list',
            room
          )
        } catch (error) {
          console.log(error)
        }
      }
    },
})