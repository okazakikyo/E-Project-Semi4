<template>
  <Field
    :type="type"
    v-slot="{ field }"
    v-model="inputText"
    :name="name"
    :rules="rules"
  >
  <InputText
    class="w-full md:w-30rem mb-5"
    :class="{
        'p-invalid': errors[name]
    }"
    v-bind="field"
    :placeholder="placeholder"
    :required="required"
  >
  </InputText>
  </Field>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Field, ErrorMessage } from "vee-validate";

export default defineComponent ({
    setup(props, { emit }) {
     
  },
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    options: {
      type: Object,
      default: () => null,
    },
    value: {
      type: String,
      default: () => null,
    },
    name: {
      type: String,
      default: () => null,
    },
    placeholder: {
      type: String,
      default: () => null,
    },
    type: {
      type: String,
      default: () => 'text',
    },
    rules: {
      type: [String, Object],
      default: () => null,
    },
    errors: {
      type: Object,
      default: {}
    },
    required: {
      type: Boolean,
      default: () => false,
    },
  },
  data: () => ({
    focusInput: false,
    input: null,
    isShowPass: false,
    inputText: null,
    temp: '',
    key: null
  }),
  watch: {
    value() {
      if (this.value) {
        this.inputText = this.value;
      }
    },
  },
})
</script>

<style scoped>

</style>