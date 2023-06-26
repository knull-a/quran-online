<script setup lang="ts">
type Props = {
  name: string
  type?: string
  label?: string
  placeholder?: string
  value?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text'
})

const name = toRef(props, 'name');

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
  validateOnValueUpdate: false
});

</script>
<template>
  <div class="w-full">
    <label :for="name">{{ label }}</label>
    <input class="w-full outline-none rounded-md bg-transparent py-3 px-4"
      :class="{ 'border border-error': !!errorMessage }" :name="name" :id="name" :type="type" :value="inputValue"
      :placeholder="placeholder" @input="handleChange" @blur="handleBlur" />
  </div>
</template>