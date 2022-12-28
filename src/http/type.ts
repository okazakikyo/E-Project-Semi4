export interface GenericResponse {
    result: any;
    error: string;
}
export interface User {
    userId: number;
    userName: string;
    password: string;
    staffId: number;
    createAt: string;
    isDelete: boolean;
    lastModifiedAt: string;
    lastModifiedBy: number;
}
export interface UserSchedule {
    id: number;
    title: string;
    startTime: string;
    endTime: string;
    date: string;
    createAt: string;
}

export interface EventSchedule {
    idEvent: number;
    title: string;
    startDate: string;
    endDate: string;
}

export interface UserLogin{
    userName: string;
    password: string;
}

export interface Staff{
    staffId: number;
    name: string;
    phone: string;
    birthday: string;
    address: string;
    image: string;
    createAt: string;
    isDelete: boolean;
    lastModifiedAt: string;
    lastModifiedBy: number;
}

export interface Invited{
    invitedId: number;
    bookingId: number;
    userId: number;
}

export interface TraineeMentor{
    traineeId: number;
    trainee: number;
    mentor: number;
    process: number;
    isSuccess: boolean;
}

export interface Department{
    departmentId: number;
    department: string;
    position: string;
    active: boolean;
    createAt: string;
    isDelete: boolean;
    lastModifiedAt: string;
    lastModifiedBy: number;
}

export interface StaffDepartment{
    id: number;
    department: string;
    position: string;
    active: boolean;
    createAt: string;
    isDelete: boolean;
    lastModifiedAt: string;
    lastModifiedBy: number;
}

export interface Room{
    id: number;
    name: string;
    capacity: number;
    description: string;
    image: string;
    active: boolean;
    createAt: string;
    isDelete: boolean;
    lastModifiedAt: string;
    lastModifiedBy: number;
}

export interface Booking{
    bookingId: number;
    title: string;
    host: number;
    description: string;
    startTime: string;
    endTime: string;
    date: string;
    onlineLink: string;
    createAt: string;
    isDelete: boolean;
    lastModifiedAt: string;
    lastModifiedBy: number;
}