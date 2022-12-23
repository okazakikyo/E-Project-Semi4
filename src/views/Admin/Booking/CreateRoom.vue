<template>
    <div class="card">
        <Form @submit="onSubmit">
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
                        <Calendar inputId="calendar" v-model="roomInfo.createdAt" :maxDate="maxDate"></Calendar>
                        <label for="calendar">Start Date</label>
                    </span>
                </div>
                <div class="field col-12 md:col-4">
                    <span class="p-float-label">
                        <Calendar inputId="calendar" v-model="roomInfo.end_date" :minDate="minDate"></Calendar>
                        <label for="calendar">End Date</label>
                    </span>
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
import { Field, Form, ErrorMessage } from "vee-validate";

const countries = ref([]);
const cities = ref([
    { name: 'Active', code: 'AC' },
    { name: 'Closed', code: 'CL' },
]);
const filteredCountries = ref(null);
const checked1 = ref(true);
const maxDate = ref(new Date());
const minDate = ref(new Date());
const value1 = ref(null);
const value2 = ref(null);
const value3 = ref(null);
const value4 = ref(null);
const value5 = ref(null);
const value6 = ref(null);
const value7 = ref(null);
const value8 = ref(null);
const value9 = ref(null);
const value10 = ref(null);
const roomInfo = ref({});
const countryService = new CountryService();
const previewImage = ref(null);
const fileInput = ref(null);
const emit = defineEmits(['input'])

onMounted(() => {
    countryService.getCountries().then((data) => (countries.value = data));
});

const searchCountry = (event) => {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered = [];
    const query = event.query;
    for (let i = 0; i < countries.value.length; i++) {
        const country = countries.value[i];
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }
    filteredCountries.value = filtered;
};

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
    const createNew = mapActions(useUserStore, ['createRoom'])
    try {
        createNew.createRoom(roomInfo.value)
    } catch (e) {
        console.log(e)
    }
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