<template>
  <div>
    <teacher-card :isFixedWidth="true" :teacherInfo="teacherInfo" />
    <card-view-container>
      <card-view
        :displayFlexDirectionColumn="true"
        :isFixedHeight="false"
        v-bind:key="section.id"
        v-for="section in TEACHER_SECTIONS"
      >
        <plain-text
          :cssModuleProps="{
            fontWeight: 'fontWeight700',
            color: 'color_7a7a7a',
          }"
        >
          {{ section.name }}
        </plain-text>
        <div v-if="section.id === 2">
          <v-date-picker
            v-model="reserveDay"
            :attributes="attributes()"
            :class="$style.vCalendarContainer"
            @dayclick="onDayClick"
          />
        </div>
        <div v-if="section.id === 2">
          <div :class="$style.reservationBox" v-if="isReservAvailable">
            <plain-text
              :cssModuleProps="{
                fontWeight: 'fontWeight700',
                color: 'color_7a7a7a',
              }"
            >
              {{ currentDay }}
            </plain-text>
            <a-button @click="handleReservation">예약하기</a-button>
          </div>
          <p v-else>예약 불가능</p>
        </div>
      </card-view>
    </card-view-container>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, toRaw, watch } from 'vue';
import { useRouter } from 'vue-router';
import { URLS } from '@/constants/constants';
import CardViewVue from '@/components/CardView.vue';
import CardViewContainerVue from '@/components/CardViewContainer.vue';
import PlainTextVue from '@/components/PlainText.vue';
import AButton from '@/components/AButton.vue';
import dayjs from 'dayjs';
import TeacherCardVue from './TeacherCard.vue';

const TEACHER_SECTIONS = [
  { name: '선생님 후기', id: 1 },
  { name: '선생님 예약 일정', id: 2 },
  { name: '선생님 활동', id: 3 },
];

interface IReviews {
  title: string;
  description: string;
}

interface IDays {
  dates: Date;
  highlight: boolean;
}

interface DayClickProps {
  date: Date;
}

export default defineComponent({
  components: {
    'teacher-card': TeacherCardVue,
    'card-view': CardViewVue,
    'card-view-container': CardViewContainerVue,
    'plain-text': PlainTextVue,
    'a-button': AButton,
  },
  setup() {
    const teacherInfo = ref({ name: '', image: '' });
    const reviews = ref<IReviews[]>([]);
    const days = ref<IDays[]>([]);
    const reserveDay = ref<{ dates: Date }>({ dates: new Date() });
    const router = useRouter();
    const currentParams = +router.currentRoute.value.params.id;
    const isReservAvailable = ref(false);

    const currentDay = ref('');

    function attributes() {
      const datesArray = days.value;

      return datesArray.map((d) => ({
        highlight: true,
        dates: d.dates,
      }));
    }

    function onDayClick({ date }: DayClickProps) {
      const isReserved =
        toRaw(days.value).filter((day) => String(day.dates) === String(date))
          .length > 0;
      if (!isReserved) {
        isReservAvailable.value = true;
        reserveDay.value = { dates: date };
      } else {
        isReservAvailable.value = false;
      }
    }

    function handleReservation() {
      alert('예약이 완료되었습니다.');
    }

    onMounted(() => {
      currentDay.value = dayjs(toRaw(reserveDay.value).dates).format(
        'YYYY-MM-DD',
      );
      teacherInfo.value = URLS[currentParams];
      reviews.value = URLS[currentParams].teacherReview as IReviews[];
      days.value = URLS[currentParams].teacherReservation as IDays[];
      onDayClick({ date: toRaw(reserveDay.value).dates });
    });

    watch(
      () => toRaw(reserveDay.value).dates,
      (newVal) => {
        currentDay.value = dayjs(newVal).format('YYYY-MM-DD');
      },
    );

    return {
      teacherInfo,
      TEACHER_SECTIONS,
      onDayClick,
      attributes,
      days,
      reserveDay,
      isReservAvailable,
      currentDay,
      handleReservation,
    };
  },
});
</script>
<style lang="scss" module>
.teacherInfoBox {
  display: flex;
  flex-direction: row;
}

.vCalendarContainer {
  border: 1px solid transparent;
  width: 100%;
}

.reservationBox {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
