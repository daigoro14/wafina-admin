<template>
  <v-text-field
    v-model="displayValue"
    :rules="rules"
    class="!inline-block custom-input"
    :label="label"
    variant="outlined"
    :clearable="!readOnly"
    width="100%"
    :type="password ? 'password' : 'text'"
    :readonly="readOnly"
    @input="filterInput"
    :maxlength="label === 'Telefon' ? 20 : 100"
    @update:modelValue="sanitizePostalCode"
  >
    <template #label>
      <label class="text-sm">{{ label }}</label>
    </template>
    <template #clear v-if="!readOnly">
      <v-icon tabindex="-1" @click="clearInput">mdi-close-circle</v-icon>
    </template>
  </v-text-field>
</template>

<script setup>
import { ref, watch } from 'vue';

// Props
const props = defineProps({
  modelValue: {
    type: null,
    default: '',
  },
  label: {
    type: String,
    default: 'Input',
  },
  rules: {
    type: Array,
    default: () => [],
  },
  password: {
    type: Boolean,
    default: false,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  numbersOnly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'clearFields']);

const phoneNumber = ref('');

const displayValue = ref(props.modelValue);

const filterInput = (event) => {
  // Allow only numbers, spaces, and specific symbols
  if (props.numbersOnly) { 
  displayValue.value = event.target.value.replace(/[^0-9+()\-\s]/g, '');
  } 
};

watch(() => props.modelValue, (newVal) => {
  displayValue.value = newVal;
});

watch(displayValue, (newVal) => {
  emit('update:modelValue', newVal);
});

const sanitizePostalCode = (value) => {
  if (props.label === 'Postnummer') {
  displayValue.value = value.replace(/\s+/g, '');
  }
};

const clearInput = () => {
  displayValue.value = '';
  emit('update:modelValue', '');
  emit('clearFields')
};
</script>
