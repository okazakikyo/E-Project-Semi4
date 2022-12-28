<template>
  <Transition name="modal">
      <div v-if="show" class="modal-mask">
        <div class="modal-wrapper">
          <form @submit.prevent="onSubmit">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header"></slot>
            </div>
            
            <div class="modal-body">
              <slot name="body">
                <div class="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Name Event"
                    v-model="eventSchedule.name"
                    required
                  />
                  <error-message name="name"></error-message>
                </div>
                <div class="form-group">
                  <label>Date from</label>
                  <Datepicker v-model="getDate" :enable-time-picker="false"></Datepicker>
                </div>
                <div class="form-group">
                  <label>Date to</label>
                  <Datepicker
                    v-model="eventSchedule.endDate"
                    :enable-time-picker="false"
                    :min-date="getDate"
                    required
                  ></Datepicker>
                </div>
                <div class="form-group">
                  <label>Type</label>
                  <select
                    class="form-control"
                    v-model="eventSchedule.type"
                    required
                  >
                    <option class="form-control" v-for="i in type" :key="i">
                      {{ i }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Description</label>
                  <textarea
                    type="text"
                    class="form-control"
                    placeholder="Describe event"
                    v-model="eventSchedule.description"
                    required
                  />
                </div>
              </slot>
            </div>

            <div class="">
              <slot name="footer">
                <div class="d-grid gap-2">
                  <b-button
                    variant="success"
                    type="submit"
                    >Create</b-button
                  >
                  <b-button block variant="outline-dark" @click="$emit('close')"
                    >Cancel (back to calendar)</b-button
                  >
                </div>
              </slot>
            </div>
          </div>
        </form>
        </div>
      </div>
  </Transition>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import moment from "moment";
import { useErrorStore } from "../stores/errors";
import { useLoading } from "vue-loading-overlay";
import { Field, Form, ErrorMessage } from "vee-validate";
import { mapActions, mapState } from "pinia";
import { useUserStore } from '../stores/user'
import * as yup from 'yup';
import _ from "lodash";

export default defineComponent({
  setup() {
    const storeUser = useUserStore()
    return { storeUser }
  },
  props: {
    show: Boolean,
    id: [String, Number],
    getDate: String,
  },
  data: () => ({
    eventSchedule: {},
    type: ["meeting", "busy", 'holiday'],
    // scheduleList: [
    //   {
    //     name: "testEvent",
    //     startDate: "2022/12/05",
    //     endDate: "2022/12/05",
    //     type: "busy",
    //     description: "testABC",
    //   },
    // ],
  }),
  components: {
    Datepicker,
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  computed: {
    ...mapState(useErrorStore, ["errors"]),
    ...mapState(useUserStore, ["scheduleList"]),
  },
  methods: {
    ...mapActions(useUserStore, ["setUserSchedule"]),
    schema() {
      yup.object({
        name: yup.string().required()
      })
    },
    onSubmit() {
      const $loading = useLoading();
      const loader = $loading.show({});

      this.eventSchedule.id = moment(this.getDate).format('YYYYMMDD')
      this.eventSchedule.startDate = this.getDate;
      // this.eventSchedule.startDate = new Date(this.eventSchedule.startDate);
      // this.eventSchedule.endDate = new Date(this.eventSchedule.endDate);
      this.eventSchedule.startDate = moment(
        this.eventSchedule.startDate
      ).format("YYYY/MM/DD");
      this.eventSchedule.endDate = moment(this.eventSchedule.endDate).format(
        "YYYY/MM/DD"
      );

      // const newDate = {}
      // newDate.id = this.eventSchedule.id
      // newDate.name = this.eventSchedule.name
      // newDate.startDate = this.eventSchedule.startDate
      // newDate.endDate = this.eventSchedule.endDate
      // newDate.type = this.eventSchedule.type
      // newDate.description = this.eventSchedule.description
      const index = _.indexOf(this.scheduleList, this.eventSchedule.id)

      if(index === -1) {
        this.scheduleList.push({
          id : this.eventSchedule.id,
          name : this.eventSchedule.name,
          startDate : this.eventSchedule.startDate,
          endDate : this.eventSchedule.endDate,
          type : this.eventSchedule.type,
          description : this.eventSchedule.description
        });
        console.log(this.scheduleList)
        this.storeUser.setUserSchedule(this.scheduleList)
        this.eventSchedule = {};
      }

      // const parseEvents = _.map(this.scheduleList, (date) => {
      //   const dateFrom = new Date(date.startDate)
      //   console.log(dateFrom)
      //   const dateTo = new Date(date.endDate)
      //   const getDateFrom = dateFrom.getDate()
      //   const getDateTo = dateTo.getDate()
      //   console.log(getDateTo - getDateFrom)
      //   const totalDate = getDateTo - getDateFrom
      //   for(let i = 0; i < totalDate; i++) {
      //     console.log(date.startDate + i)
      //   }
      // })
      
      loader.hide();
      this.$emit("close");
    },
  },
  created() {
  },
});
</script>
<style lang="scss" scoped>
// .img-icon{
//   position: absolute;;
//   width: 24px;
//   height: 24px;
//   right: 105px;
//   top: 70px;
// }
// *,
// *:before,
// *:after{
//     padding: 0;
//     margin: 0;
//     box-sizing: border-box;
// }
// input[type="date"]{
//     background-color: #fff;
//     border:  1px solid #ced4da !important;
//     padding: 0.375rem 0.75rem !important;
//     padding: 15px;
//     top: 50%;
//     left: 50%;
//     font-family: "Roboto Mono",monospace;
//     color: #212529;
//     font-size: 18px;
//     border: none;
//     outline: none;
//     border-radius: 5px;
// }
// ::-webkit-calendar-picker-indicator{
//     background-color: #ffffff;
//     padding: 5px;
//     cursor: pointer;
//     border-radius: 3px;
// }
.modal-container {
  width: 50% !important;
}
.modal-footer {
  justify-content: space-between !important;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>