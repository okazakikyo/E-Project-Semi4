<template>
<Form @submit="onSubmit">
    <Toast/>
  <div class="top d-flex justify-content-center align-items-center">
        <div class="top-text">
            {{ 'Room Details' }}
        </div>
    </div>
    <div class="body-content">
            <img class="img-details" :src="contextPath + 'demo/images/room/' + roomDetails.image" alt=""/>
            <div class="">
                <div class="row">
                    <div class="col-6 name-text">
                        {{ roomDetails.name }}
                    </div>
                    <div class="col-6 d-flex justify-content-end slot-text">
                        {{ roomDetails.capacity > 1 ? roomDetails.capacity + ' ' + 'slots' : roomDetails.capacity + ' ' + 'slot' }}
                    </div>
                </div>
                <div class="thumbnail-text">
                    <span class="">Input Info booking:</span>
                    <div class="row d-flex align-items-center">
                        <Field type="text"
                            rules="required"
                            name="start_date"
                            v-slot="{ field, meta }">
                        <label class="col-3" for="dateformat">Start date </label>
                        <Calendar class="col" v-bind="field" :class="{ 'p-invalid': !meta.valid && meta.touched }" inputId="dateformat" v-model="bookingRoom.start_date" :minDate="getMinDate(new Date())" :maxDate="getMaxDate(roomDetails.end_date)" dateFormat="mm-dd-yy"/>
                        <ErrorMessage class="p-error" :name="'start_date'"></ErrorMessage>
                        </Field>
                    </div>
                    <div class="row d-flex align-items-center">
                        <Field type="text"
                            rules="required"
                            name="end_date"
                            v-slot="{ field, meta }">
                        <label class="col-3" for="dateformat">End date </label>
                        <Calendar class="col" v-bind="field" :class="{ 'p-invalid': !meta.valid && meta.touched }" inputId="dateformat" v-model="bookingRoom.end_date" :minDate="getMinDate(bookingRoom.start_date)" :maxDate="getMaxDate(roomDetails.end_date)" dateFormat="mm-dd-yy" />
                        </Field>
                        <ErrorMessage class="p-error" :name="'end_date'"></ErrorMessage>
                    </div>
                    <div class="row d-flex align-items-center">
                        <Field type="text"
                            rules="required"
                            name="capacity"
                            v-slot="{ field, meta }">
                        <label class="col-3">Slots </label>
                        <InputText type="number" class="col input-field" v-bind="field" :class="{ 'p-invalid': !meta.valid && meta.touched }" v-model="bookingRoom.slots"></InputText>
                        </Field>
                        <ErrorMessage class="p-error" :name="'capacity'"></ErrorMessage>
                    </div>
                </div>
                <div class="thumbnail-text">
                    <span class="">Description:</span>
                    <div class="content-text">
                        <div>Start date : {{ roomDetails.createdAt }}</div>
                        <div>End date : {{ roomDetails.end_date }}</div>
                        {{ roomDetails.description }}
                    </div>
                </div>
            </div>
    </div>
    <!-- <Paypal></Paypal> -->
    <div class="btn-layout d-flex justify-content-center">
        <button type="submit" class="btn-booking">Booking Now</button>
    </div>
</Form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "@/stores/user";
import { useErrorStore } from "@/stores/errors";
import { mapState, mapActions } from "pinia";
import { useLayout } from '@/layout/composables/layout';
import moment from 'moment';
import { Field, Form, ErrorMessage } from "vee-validate";
import { useLoading } from "vue-loading-overlay";
import Paypal from "@/components/Paypal.vue";

export default defineComponent({
    setup: () => ({

    }),
    data: () => ({
        roomDetails: {},
        contextPath: '',
        bookingRoom: {},
    }),
    components: {
        Field,
        Form,
        ErrorMessage,
        Paypal
    },
    computed: {
        ...mapState(useErrorStore, ['errors'])
    },
    methods: {
        ...mapActions(useErrorStore, ['setEmptyError']),
        ...mapActions(useUserStore, ['getRoomById','bookRoom', 'updateRoom', 'addRoomBook']),
        async getRoomDetails() {
            const $loading = useLoading();
            const loader = $loading.show({});
            const { contextPath } = useLayout();
            this.contextPath = contextPath;
            const id = this.$route.params["id"] ? this.$route.params["id"] : null
            this.roomDetails = await this.getRoomById(id);
            loader.hide();
        },
        getMinDate(date) {
            return moment(date).toDate();
        },
        getMaxDate(date) {
            return moment(date).toDate();
        },
        async onSubmit() {
            const $loading = useLoading();
            const loader = $loading.show({});
            const user = JSON.parse(localStorage.getItem("user"))
            if(this.bookingRoom.slots > this.roomDetails.slots) {
                console.log('error')
            }else {
                this.bookingRoom.id = user.user.id;
                this.bookingRoom.name = user.user.staff_id.name;
                this.bookingRoom.email = user.user.email;
                this.bookingRoom.status = 1;
                this.bookingRoom.start_date = moment(this.bookingRoom.start_date).format('YYYY-MM-DD')
                this.bookingRoom.end_date = moment(this.bookingRoom.end_date).format('YYYY-MM-DD')
                const submitData = {
                    title: this.roomDetails.name,
                    host: this.bookingRoom.name,
                    description: this.roomDetails.description,
                    start_time: this.roomDetails.createdAt,
                    end_time: this.roomDetails.end_date,
                    image: this.roomDetails.image,
                    orders: [
                        this.bookingRoom
                    ],
                    status: this.roomDetails.active,
                    createAt: this.roomDetails.createdAt,
                    isDelete: this.roomDetails.isDelete,
                    onlineLink: ''
                }
                try {
                    await this.bookRoom(submitData);
                    const id = this.$route.params["id"] ? this.$route.params["id"] : null
                    const calSlots = this.roomDetails.capacity - parseInt(this.bookingRoom.slots)
                    const updateData = {
                        id: id,
                        name: this.roomDetails.name,
                        capacity: calSlots.toString(),
                        description: this.roomDetails.description,
                        image: this.roomDetails.image,
                        active: this.roomDetails.active,
                        createdAt: this.roomDetails.createAt,
                        end_date: this.roomDetails.end_date,
                        isDelete: this.roomDetails.isDelete,
                        lastmodifiedat: "",
                        lastmodifiedby: ""
                    }
                    const bookRoom = {
                        room_id: parseInt(id),
                        title: this.roomDetails.name,
                        name: this.bookingRoom.name,
                        email: this.bookingRoom.email,
                        slots: this.bookingRoom.slots,
                        description: this.roomDetails.description,
                        image: this.roomDetails.image,
                        status: this.roomDetails.active,
                        createdAt: this.roomDetails.createAt,
                        start_date: this.bookingRoom.start_date,
                        end_date: this.bookingRoom.end_date,
                        isDelete: this.roomDetails.isDelete,
                        lastmodifiedat: "",
                        lastmodifiedby: "",
                        onlineLink: '',
                    }
                    await this.addRoomBook(bookRoom)
                    await this.updateRoom(id, updateData)
                    if(!this.errors) {
                        this.$router.push({ name: 'UserBooking' })
                    } else {
                        this.$toast.add({severity:'error', summary:'Error Message', detail: this.errors, life: 3000})
                        setTimeout(() => this.setEmptyError(), 2000)
                    }
                } catch (error) {
                    console.log(error)
                }
                loader.hide();
            }
        }
    },
    created() {
        this.getRoomDetails();
    }
})
</script>

<style lang="scss" scoped>
.input-field{
    margin: 0 16px 0 16px;
    padding: 8px;
}
.slot-text{
    font-family: 'Plus Jakarta Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 150%;
    color: #4C4DDC;
}
.content-text{
    font-family: 'Plus Jakarta Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: #878787;
}
.name-text{
    font-family: 'Plus Jakarta Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 150%;
    color: #101010;
}
.thumbnail-text{
    font-family: 'Plus Jakarta Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 150%;
    color: #101010;
}
.btn-layout{
    border-radius: 12px;
    padding-top: 16px;
}
.btn-booking{
    width: 100%;
    font-family: 'Plus Jakarta Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 150%;
    background-color: #4C4DDC;
    color: #FFFFFF;
    padding: 16px;
    border-radius: 12px;
    &:focus{
        background-color: #3b3ba2;
    }
}
.img-details{
    width: 100%;
    height: 246px;
    border-radius: 8px;
}
.top {
    padding-bottom: 12px;
    gap: 65px;
}
.top-text{
    font-family: 'Plus Jakarta Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    line-height: 150%;
    /* identical to box height, or 24px */


    color: #101010;
}
</style>