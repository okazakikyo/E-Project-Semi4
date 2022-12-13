<template>
    <div class="card">
        <h5>Float Label</h5>
        <div class="grid p-fluid mt-3">
            <div class="field col-12 md:col-4">
                <span class="p-float-label">
                    <InputText type="text" id="inputtext" v-model="value1" />
                    <label for="inputtext">Room Name</label>
                </span>
            </div>
            <div class="field col-12 md:col-4">
                <span class="p-float-label">
                    <InputNumber id="inputnumber" v-model="value6"></InputNumber>
                    <label for="inputnumber">Capacity</label>
                </span>
            </div>
            <div class="field col-12 md:col-4">
                <span class="p-float-label">
                    <Dropdown id="dropdown" :options="cities" v-model="value8" optionLabel="name"></Dropdown>
                    <label for="dropdown">Status active</label>
                </span>
            </div>
            <div class="field col-12 md:col-4">
                <span class="p-float-label">
                    <Textarea inputId="textarea" rows="3" cols="30" v-model="value10"></Textarea>
                    <label for="textarea">Description</label>
                </span>
            </div>
            <div class="field col-12 md:col-4">
                <div>Images</div>
                <label for="upload" class="upload-btn">Choose file</label>
                <input id="upload" mode="basic" ref="fileInput" type="file" @input="pickFile" hidden>
                <!-- <span class="p-float-label">
                    <FileUpload ref="fileInput" mode="basic" name="demo[]" url="./upload.php" accept="image/*" :maxFileSize="1000000" @upload="onUpload" v-model="previewImage"/>
                    <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${previewImage})` }" @click="selectImage"></div>
                </span> -->
                <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${previewImage})` }" @click="selectImage" v-if="previewImage"></div>
            </div>
            <!-- <div class="field col-12 md:col-4">
                <span class="p-float-label">
                    <InputText type="number" id="inputNumber" v-model="value2" />
                    <label for="autocomplete">Capacity</label>
                </span> -->
            <!-- </div>
            <div class="field col-12 md:col-4">
                <span class="p-float-label">
                    <Calendar inputId="calendar" v-model="value3"></Calendar>
                    <label for="calendar">Calendar</label>
                </span>
            </div> -->
            <!-- <div class="field col-12 md:col-4">
                <span class="p-float-label">
                    <Chips inputId="chips" v-model="value4"></Chips>
                    <label for="chips">Chips</label>
                </span>
            </div>
            <div class="field col-12 md:col-4">
                <span class="p-float-label">
                    <InputMask id="inputmask" mask="99/99/9999" v-model="value5"></InputMask>
                    <label for="inputmask">InputMask</label>
                </span>
            </div> -->
            <!-- <div class="field col-12 md:col-4">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                    </span>
                    <span class="p-float-label">
                        <InputText type="text" id="inputgroup" v-model="value7" />
                        <label for="inputgroup">InputGroup</label>
                    </span>
                </div>
            </div> -->
            <!-- <div class="field col-12 md:col-4">
                <span class="p-float-label">
                    <MultiSelect id="multiselect" :options="cities" v-model="value9" optionLabel="name" :filter="false"></MultiSelect>
                    <label for="multiselect">MultiSelect</label>
                </span>
            </div> -->
        </div>
        <div class="d-flex justify-content-center">
            <Button>Create</Button>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import CountryService from '@/service/CountryService';

const countries = ref([]);
const cities = ref([
    { name: 'Active', code: 'AC' },
    { name: 'Closed', code: 'CL' },
]);
const filteredCountries = ref(null);
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
    if(file && file[0]) {
        let reader = new FileReader
        reader.onload = e => {
            previewImage.value = e.target.result
        }
        reader.readAsDataURL(file[0])
        emit('input', file[0])
    }
}

const selectImage = () => {
    fileInput.value.click()
}
</script>
<style lang="scss" scoped>
.upload-btn{
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