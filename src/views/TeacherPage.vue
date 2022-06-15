<template>
  <div :class="classes.teacherInfoBox">
    <teacher-image :dynamicShow="false" :imageUrl="teacherInfo.image" />
    <div>{{ teacherInfo.name }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import TeacherImageVue from '@/components/TeacherImage.vue';
import { useRouter } from 'vue-router';
import { URLS } from '@/constants/constants';

export default defineComponent({
  components: { 'teacher-image': TeacherImageVue },
  setup() {
    const teacherInfo = ref({ name: '', image: '' });
    const router = useRouter();
    const currentParams = +router.currentRoute.value.params.id;

    onMounted(() => {
      teacherInfo.value = URLS[currentParams];
    });

    return { teacherInfo };
  },
});
</script>
<style lang="scss" module="classes">
.teacherInfoBox {
  display: flex;
  flex-direction: row;
}
</style>
