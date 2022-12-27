<template>
<Form @submit="onSubmit">
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
        ErrorMessage
    },
    computed: {
        ...mapState(useErrorStore, ['errors'])
    },
    methods: {
        ...mapActions(useUserStore, ['getRoomById','bookRoom']),
        async getRoomDetails() {
            const { contextPath } = useLayout();
            this.contextPath = contextPath;
            const id = this.$route.params["id"] ? this.$route.params["id"] : null
            this.roomDetails = await this.getRoomById(id);
        },
        getMinDate(date) {
            return moment(date).toDate();
        },
        getMaxDate(date) {
            return moment(date).toDate();
        },
        async onSubmit() {
            console.log(localStorage)
            if(this.bookingRoom.slots > this.roomDetails.slots) {
                console.log('error')
            }else {
                this.bookingRoom.id = 1001;
                this.bookingRoom.name = 'John';
                this.bookingRoom.status = 1;
                this.bookingRoom.start_date = moment(this.bookingRoom.start_date).format('YYYY-MM-DD')
                this.bookingRoom.end_date = moment(this.bookingRoom.end_date).format('YYYY-MM-DD')
                const submitData = {
                    title: this.roomDetails.name,
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
                await this.bookRoom(submitData);
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