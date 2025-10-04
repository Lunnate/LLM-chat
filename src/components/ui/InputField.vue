<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: String,
  modelValue: String,
  error: String,
});

defineEmits(["update:modelValue", "blur"]);
</script>

<template>
  <div class="relative mb-0">
    <input
      :type="type"
      :value="modelValue"
      placeholder=" "
      class="w-full px-5 py-4 bg-black border border-white/10 rounded-xl text-white text-base transition-all duration-300 outline-none mb-2.5 placeholder:text-white/40 focus:border-white focus:shadow-[inset_0_4px_8px_rgba(174,139,248,0.15),inset_0_2px_4px_rgba(174,139,248,0.25),0_0_0_3px_rgba(174,139,248,0.1)] focus:bg-black focus:opacity-20 peer"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      @blur="$emit('blur')"
    />
    <label
      class="absolute left-5 top-[45%] -translate-y-1/2 text-base text-white/60 font-normal transition-all duration-300 ease-in-out pointer-events-none z-[1] peer-focus:top-[-12px] peer-focus:left-4 peer-focus:text-base peer-focus:text-white peer-focus:px-2 peer-focus:rounded peer-[:not(:placeholder-shown)]:top-[-12px] peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-base peer-[:not(:placeholder-shown)]:text-white peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:rounded"
    >
      {{ label }}
    </label>
  </div>
</template>

<style scoped></style>
