<template>
  <div class="main">
    <div class="navigation">
      <div class="back" @click="previous()">
        {{ previousMonth }}
      </div>
      <div class="monthAndYear">
        {{ date }}
      </div>
      <div class="forward" @click="next()">
        {{ nextMonth }}
      </div>
    </div>
    <div class="row">
      <div class="col dayLabel cell" v-for="(day, i) in days" :key="i">
        {{ day }}
      </div>
    </div>
    <div class="row" v-for="(v, i) in isInMonth() ? 5 : 6" :key="i">
      <div
        class="col cell"
        v-for="j in 7"
        :class="{
          current: compareDate(7 * i + j - offset - 1),
          otherMonth: !isThisMonth(7 * i + j - offset - 1),
        }"
        :key="j"
        @click="chooseDate(7 * i + j - offset - 1)"
      >
        <div class="date">
          {{ getDay(7 * i + j - offset - 1) }}
          {{ checkHoliday(7 * i + j - offset - 1) }}
        </div>
        <div
          class="event"
          :class="{
            miniEvent: isEventStandard(i, j),
          }"
        ></div>
        <div
          class="event"
          :class="{
            // 'miniEvent holiday': isEventHoliday(i, j),
            'miniEvent holiday': checkHoliday(i, j),
          }"
        ></div>
        <div
          class="event"
          :class="{
            'miniEvent busy': isEventBusy(i, j),
          }"
        ></div>
      </div>
    </div>
    <Teleport to="body">
      <Modal
        :id="idDate"
        :getDate="getDate"
        :show="modalEdit"
        @close="modalEdit = false"
      >
        <template #header>
          <h3>Add event schedules</h3>
        </template>
      </Modal>
    </Teleport>
  </div>
  <b-modal
    v-model="modalEdit"
    id="modal-edit"
    title="AB"
    centered
    :dialog-class="'alert-modal'"
  >
    <div class="modal-head">
      <div class="d-flex justify-content-center align-items-center title">
        <div>aaaa</div>
      </div>
      <div
        class="
          d-flex
          justify-content-center
          align-items-center
          title-modal
          pb-4
        "
      >
        ok
      </div>
    </div>
    <div class="modal-foot pointer-event" @click="modalEdit = false">
      cancel
    </div>
  </b-modal>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import moment from "moment";
import Modal from "/src/components/Modal.vue";
import { mapActions, mapState } from "pinia";
import { useUserStore } from "../stores/user";
import _ from "lodash";
import { format } from "path";

export default defineComponent({
  props: {},
  components: {
    Modal,
  },

  data: () => ({
    days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    firstDay: moment().format("YYYY-MM-01"),
    offset: null,
    firstInCalendar: null,
    holidays: [],
    needUpdateDates: [],
    date: moment().format("YYYY-MM-DD"),
    modalEdit: false,
    idDate: null,
    getDate: "",
    keyEvent: {},
  }),

  watch: {
    firstDay(val, old) {
      var currentMonth = moment(val).month();
      var oldMonth = moment(old).month();
    },
  },

  computed: {
    ...mapState(useUserStore, ["scheduleList"]),
    nextMonth() {
      return moment(this.firstDay).add(1, "months").format("M月");
    },
    previousMonth() {
      return moment(this.firstDay).subtract(1, "months").format("YYYY年MM月");
    },
    currentMonth() {
      return moment(this.firstDay).format("M");
    },
  },
  methods: {
    getDay(offset) {
      const day = moment(this.firstDay).add(offset, "days");
      if (
        !this.firstInCalendar ||
        moment(day).diff(moment(this.firstInCalendar)) < 0
      ) {
        this.firstInCalendar = day;
      }
      return moment(this.firstDay).add(offset, "days").format("D");
    },
    isInMonth() {
      const lastFirstDayRow = moment(this.firstInCalendar).add(35, "days");
      const lastDayInMonth =
        moment(this.firstDay).format("YYYY-MM-") +
        moment(this.firstDay).daysInMonth();
      return moment(lastFirstDayRow).diff(lastDayInMonth) > 0;
    },
    next() {
      this.firstInCalendar = null;
      this.firstDay = moment(this.firstDay)
        .add(1, "months")
        .format("YYYY-MM-01");
      this.offset = moment(this.firstDay).day();
    },
    previous() {
      this.firstInCalendar = null;
      this.firstDay = moment(this.firstDay)
        .subtract(1, "months")
        .format("YYYY-MM-01");
      this.offset = moment(this.firstDay).day();
    },
    chooseDate(offset) {
      console.log(this.scheduleList);
      this.idDate = offset;
      this.modalEdit = true;
      this.getDate = moment(this.firstDay)
        .add(offset, "days")
        .format("YYYY-MM-DD");
    },
    compareDate(offset) {
      return (
        this.date ==
        moment(this.firstDay).add(offset, "days").format("YYYY-MM-DD")
      );
    },
    checkHoliday(offset) {
        // console.log(moment())
        // const findDateEvent = _.includes(this.scheduleList,
        //   return (f.startDate = moment(this.firstDay)
        //     .add(offset, "days")
        //     .format("YYYY/MM/DD"));
        // );
      // console.log(findDateEvent);
      // if (findDateEvent) {
      // }
      const holidayDate = _.findIndex(this.scheduleList, (date) => {
        return date.type == "holiday";
      });
      if (holidayDate >= 0) {
        return true;
      }
      return false;
      // return this.holidays.includes(
      //   moment(this.firstDay).add(offset, "days").format("YYYY-MM-DD")
      // );
    },
    isThisMonth(offset) {
      let currentMonth = moment(this.firstDay).format("M");
      let offsetMonth = moment(this.firstDay).add(offset, "days").format("M");
      return currentMonth === offsetMonth;
    },
    inNeedUpdateList(offset) {
      return this.needUpdateDates.includes(
        moment(this.firstDay).add(offset, "days").format("YYYY-MM-DD")
      );
    },
    isEventStandard(i, j) {
      const offset = 7 * i + j - this.offset - 1;
      const day = moment(this.firstDay)
        .add(offset, "days")
        .format("YYYY/MM/DD");

      const index = _.findIndex(this.scheduleList, (s) => {
        const dateFrom = new Date(s.startDate);
        const dateTo = new Date(s.endDate);
        const getDateFrom = dateFrom.getDate();
        const getDateTo = dateTo.getDate();
        const totalDate = getDateTo - getDateFrom;
        console.log(totalDate);

        for (let i = 0; i < totalDate; i++) {
          console.log(i);
          const dateEvent = moment(s.startDate)
            .add(i, "days")
            .format("YYYY/MM/DD");
          console.log(dateEvent);
          s.startDate = dateEvent;
          return s.startDate == day;
        }
      });
      if (index >= 0) {
        // const data = this.scheduleList[index];
        const meet = _.findIndex(this.scheduleList, (d) => {
          return d.type == "meeting";
        });
        if (meet >= 0) {
          return true;
        }
        return false;
      }
    },
    isEventHoliday(i, j) {
      const offset = 7 * i + j - this.offset - 1;
      const day = moment(this.firstDay)
        .add(offset, "days")
        .format("YYYY/MM/DD");
      const index = _.findIndex(this.scheduleList, (s) => {
        return s.startDate == day;
      });
      if (index >= 0) {
        const data = this.scheduleList[index];
        return data.type == "holiday";
      }
      return false;
    },
    isEventBusy(i, j) {
      const offset = 7 * i + j - this.offset - 1;
      const day = moment(this.firstDay)
        .add(offset, "days")
        .format("YYYY/MM/DD");
      const index = _.findIndex(this.scheduleList, (s) => {
        return s.startDate == day;
      });
      if (index >= 0) {
        const data = this.scheduleList[index];
        return data.type == "busy";
      }
      return false;
    },
    isEvent(type, offset) {
      const dateInput = moment(this.firstDay)
        .add(offset, "days")
        .format("YYYY/MM/DD");
      const data = _.filter(this.scheduleList, (s) => {
        return s.startDate === dateInput;
      });

      if (data.length > 0) {
        const typeOf = data[0];
        if (type === "meeting") {
          if (typeOf.meeting) {
            return true;
          }
        } else {
          if (typeOf.holiday) {
            return true;
          }
        }
      }
    },
  },

  created() {
    this.offset = moment(this.firstDay).day();
    console.log(this.scheduleList)
  },

  mounted() {},
});
</script>
<style lang="scss" scoped>
.title {
  font-size: 15px;
  line-height: 1.33;
  color: #202529;
}
.main {
  padding: 20px;
}
.event {
  width: 100%;
  height: 10px;
  &.event1 {
    background-color: red;
  }
  &.event2 {
    background-color: green;
  }
  &.event3 {
    background-color: blue;
  }
}
.calendar {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  font-family: sans-serif;
  border: 4px solid #e6e6e6;
  position: relative;
}

.calendar a {
  color: grey;
}

.cell {
  padding: 0;
  background: #fffeee;
  width: 14.2857%;
  height: 90px;
  font-size: 0.7em;
  box-shadow: 0 0px 1px #393939;
}

.cell .date {
  margin: 4px;
  font-size: 12px;
}

.current {
  background: #d3edd3;
}

.current .date {
  font-weight: bold;
}

.otherMonth {
  width: 300px;
  background: #f7f7f7;
}

.otherMonth .date {
  color: #bfbfbf;
}

.addEventOnDay {
  display: inline-block;
  color: #4f4f4f;
  text-decoration: none;
  margin-left: 4px;
  background: #e1e1e1;
  padding: 0 6px;
  border-radius: 3px;
}

.miniEvent {
  background: #1f86ef;
  color: white;
  padding: 3px;
  font-size: 1em;
  cursor: pointer;
}

.miniEvent.holiday {
  background: #3fb73f;
}

.miniEvent.busy {
  background: #e7713c;
}

.navigation {
  width: 100%;
  padding: 10px 8px 14px 8px;
  border-bottom: 3px solid #b3b3b3;
}

.navigation div {
  display: inline-block;
  width: 33.33%;
}

.navigation .monthAndYear {
  font-size: 20px;
  text-align: center;
  font-weight: bold;
}

.navigation .monthAndYear a {
  text-decoration: none;
  display: inline-block;
  padding: 0 10px;
  background: #27bc27;
  border-radius: 5px;
  color: white;
  margin-left: 10px;
  text-shadow: 0 0px 2px #727272;
}

.navigation .back,
.navigation .forward {
  cursor: pointer;
  font-size: 15px;
  color: grey;
}

.navigation .back {
  text-align: left;
}

.navigation .forward {
  text-align: right;
}

.dayLabel {
  font-weight: bold;
  text-align: center;
  height: auto;
  padding: 10px 0;
  background: #e9e9e9;
  border-bottom: 3px solid #cacaca;
}

.addEvent {
  text-decoration: none;
  color: black;
  display: block;
  text-align: center;
  width: 100%;
  background: #3fb73f;
  border-bottom: 2px solid green;
  color: white;
  padding: 10px;
}

.form input,
.form select {
  width: calc(100% - 16px);
  padding: 5px;
  margin: 6px 0 10px 0;
  border: 3px solid #cacaca;
  border-radius: 4px;
  background: #f9f9f9;
}

.form select {
  width: 100%;
}

.form label {
  font-weight: bold;
  text-align: left;
  font-size: 0.8em;
  display: block;
}

button {
  width: 100%;
  background: #3fb73f;
  border: 0;
  border-bottom: 3px solid green;
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

button.red {
  background: #c82727;
  border-bottom: 3px solid #a51616;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal {
  background: white;
  position: absolute;
  width: 50%;
  text-align: center;
  left: 25%;
  top: 5%;
  border-radius: 5px;
}

.modal .inner {
  padding: 20px 30px 30px 30px;
}

.modal h3 {
  margin: 0;
  background: #e6e6e6;
  padding: 12px;
  border-radius: 5px;
}

.modal p {
  font-size: 0.8em;
  line-height: 1.5em;
}

.modal .close {
  margin-top: 22px;
  font-size: 0.7em;
  display: block;
}

.eventModal p {
  margin-bottom: 24px;
}

.eventModal p:first-of-type {
  margin-top: 0;
  margin-bottom: 0;
}

.eventModal .delete {
  display: block;
  background: #df3317;
  border-bottom: 2pxsolid #a90c0c;
  color: white;
  text-decoration: none;
  padding: 10px;
  font-size: 0.8em;
  border-radius: 3px;
  margin-bottom: 6px;
}

.eventModal button.red {
  margin-top: 8px;
}

.feedback {
  position: absolute;
  width: 90%;
  padding: 16px 0;
  left: 5%;
  text-align: center;
  bottom: 5%;
  background: #3fb73f;
  border-bottom: 3px solid green;
  border-radius: 5px;
  text-align: center;
  color: white;
}

.loader {
  position: absolute;
  top: 50%;
  margin-top: -70px;
  left: 50%;
  margin-left: -38px;
}

/* animated loading spinner from https://loading.io/css/ */
.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
