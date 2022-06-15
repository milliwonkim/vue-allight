<template>
  <teacher-card :isFixedWidth="true" :teacherInfo="teacherInfo" />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { URLS } from '@/constants/constants';
import TeacherCardVue from './TeacherCard.vue';

export default defineComponent({
  components: { 'teacher-card': TeacherCardVue },
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
<style lang="scss" module>
.teacherInfoBox {
  display: flex;
  flex-direction: row;
}
</style>
