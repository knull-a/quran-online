<script setup lang="ts">
import { defineRule, configure } from "vee-validate";
// import { required } from '@vee-validate/rules';
// import { localize } from '@vee-validate/i18n';
type Props = {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string;
};

configure({
  validateOnChange: false,
  validateOnModelUpdate: false,
  validateOnBlur: false,
});

const props = withDefaults(defineProps<Props>(), {
  type: "text",
});

const name = toRef(props, "name");

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
  validateOnValueUpdate: false,
});
</script>
<template>
  <div class="w-full">
    <label :for="name">{{ label }}</label>
    <p>{{ errorMessage }}</p>
    <input
      class="w-full outline-none rounded-md bg-transparent py-3 px-4 border border-greyLight dark:border-grey"
      :class="{ 'border border-error': !!errorMessage }"
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    />
  </div>
</template>
