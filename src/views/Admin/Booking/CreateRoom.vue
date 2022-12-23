<template>
    <div class="card">
        <Form @submit="onSubmit">
            <Toast />
            <h5>Float Label</h5>
            <div class="grid p-fluid mt-3">
                <div class="field col-12 md:col-4">
                    <span class="p-float-label">
                        <Field type="text"
                            rules="required"
                            name="roomName"
                            v-slot="{ field, meta }">
                            <InputText type="text" v-bind="field" id="inputtext" :class="{ 'p-invalid': !meta.valid && meta.touched }" v-model="roomInfo.name" />
                            <label for="inputtext">Room Name</label>
                        </Field>
                    </span>
                    <ErrorMessage class="p-error" :name="'roomName'"></ErrorMessage>
                </div>
                <div class="field col-12 md:col-4">
                    <span class="p-float-label">
                        <Field
                            type="text"
                            rules="required"
                            name="capacity"
                            v-slot="{ field, meta }">
                            <InputText id="inputnumber" type="number" v-bind="field" :class="{ 'p-invalid': !meta.valid && meta.touched }" v-model="roomInfo.capacity"></InputText>
                            <label for="inputnumber">Capacity</label>
                        </Field>
                    </span>
                    <ErrorMessage class="p-error" :name="'capacity'"></ErrorMessage>
                </div>
                <!-- <div class="field col-12 md:col-4">
                <span class="p-float-label">
                    <Dropdown id="dropdown" :options="cities" v-model="roomInfo.status" optionLabel="name"></Dropdown>
                    <label for="dropdown">Status active</label>
                </span>
            </div> -->
                <div class="field col-12 md:col-4">
                    <span class="p-float-label">
                        <Textarea inputId="textarea" rows="3" cols="30" v-model="roomInfo.description"></Textarea>
                        <label for="textarea">Description</label>
                    </span>
                </div>
                <div class="field col-12 md:col-4">
                    <span class="p-float-label">
                        <Field
                            type="text"
                            rules="required"
                            name="start_date"
                            v-slot="{ field, meta }">
                            <Calendar inputId="calendar" v-bind="field" :class="{ 'p-invalid': !meta.valid && meta.touched }" v-model="roomInfo.createdAt" :maxDate="maxDate"></Calendar>
                            <label for="calendar">Start Date</label>
                        </Field>
                    </span>
                    <ErrorMessage class="p-error" :name="'start_date'"></ErrorMessage>
                </div>
                <div class="field col-12 md:col-4">
                    <span class="p-float-label">
                        <Field
                            type="text"
                            rules="required"
                            name="end_date"
                            v-slot="{ field, meta }">
                            <Calendar inputId="calendar" v-bind="field" :class="{ 'p-invalid': !meta.valid && meta.touched }" v-model="roomInfo.end_date" :minDate="minDate"></Calendar>
                            <label for="calendar">End Date</label>
                        </Field>
                    </span>
                    <ErrorMessage class="p-error" :name="'end_date'"></ErrorMessage>
                </div>
                <div class="field col-12 md:col-4">
                    <span class="p-float-label">
                        <h6 for="calendar">{{ checked1 ? 'Active' : 'Deactive' }}</h6>
                        <InputSwitch v-model="checked1" />
                    </span>
                </div>
                <div class="field col-12 md:col-4">
                    <div>Images</div>
                    <label for="upload" class="upload-btn">Choose file</label>
                    <input id="upload" mode="basic" ref="fileInput" type="file" @input="pickFile" hidden>
                    <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${previewImage})` }"
                        @click="selectImage" v-if="previewImage"></div>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <Button type="submit">Create</Button>
            </div>
        </Form>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import CountryService from '@/service/CountryService';
import { useUserStore } from '@/stores/user'
import { mapActions } from 'pinia';
import { useToast } from "primevue/usetoast";
import { Field, Form, ErrorMessage } from "vee-validate";
import { useRouter } from "vue-router";
import moment from 'moment';

const toast = useToast();
const filteredCountries = ref(null);
const checked1 = ref(true);
const maxDate = ref(new Date());
const minDate = ref(new Date());
const roomInfo = ref({});
const countryService = new CountryService();
const previewImage = ref(null);
const fileInput = ref(null);
const emit = defineEmits(['input'])
const router = useRouter();

const pickFile = () => {
    let input = fileInput
    let file = input.value.files
    if (file && file[0]) {
        let reader = new FileReader
        reader.onload = e => {
            previewImage.value = e.target.result
        }
        reader.readAsDataURL(file[0])
        roomInfo.value.image = file[0].name
        emit('input', file[0])
    }
}

const selectImage = () => {
    fileInput.value.click()
}

const onSubmit = async () => {
    roomInfo.value.active = checked1 ? 1 : 0;
    roomInfo.value.createdAt = moment(roomInfo.value.createdAt).format('YYYY-MM-DD')
    roomInfo.value.end_date = moment(roomInfo.value.end_date).format('YYYY-MM-DD')
    console.log(roomInfo.value.createdAt)
    console.log(roomInfo.value.end_date)
    const createNew = mapActions(useUserStore, ['createRoom'])
    try {
        createNew.createRoom(roomInfo.value)
    } catch (e) {
        console.log(e)
    }
    toast.add({severity:'success', summary:'Success Message', detail:'Create room success', life: 2000})
    setTimeout(() => router.push({ name: 'RoomList' }), 2000)
}
</script>
<style lang="scss" scoped>
.upload-btn {
    background-color: indigo;
    color: white;
    padding: 0.5rem;
    font-family: sans-serif;
    border-radius: 0.3rem;
    cursor: pointer;
    margin-top: 1rem;
}

.imagePreviewWrapper {
    width: 250px;
    height: 250px;
    display: flex;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
}
</style>