<template>
  <div>
    <card-view-container>
      <teacher-card :isFixedWidth="true" :teacherInfo="teacherInfo" />
    </card-view-container>
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
        <div :class="$style.reviewContainer" v-if="section.name === REVIEW_KOR">
          <div :class="$style.reviewOuterBox" :key="review.id" v-for="review in reviews">
            <plain-text
              :cssModuleProps="{
                fontWeight: 'fontWeight700',
                color: 'color_7a7a7a',
              }"
              >{{ review.username }}</plain-text
            >
            <div :class="$style.reviewBox">
              {{ review.title }}
            </div>
            <div :class="$style.starBox">
              <div :key="i" v-for="(r, i) in review.rate">
                <font-awesome-icon v-if="r" icon="fa-solid fa-star" />
                <font-awesome-icon v-else icon="fa-regular fa-star" />
              </div>
            </div>
          </div>
        </div>
        <div v-if="section.name === RESERVATION_CALENDAR_KOR">
          <q-date v-model="days" minimal multiple :class="$style.calendarContainer" />
        </div>
        <div v-if="section.id === 2">
          <div :class="$style.reservationBox" v-if="isReservAvailable">
            <plain-text
              :cssModuleProps="{
                fontWeight: 'fontWeight700',
                color: 'color_7a7a7a',
              }"
            >
            </plain-text>
            <a-button @click="handleReservation">예약하기</a-button>
          </div>
        </div>
      </card-view>
    </card-view-container>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, toRaw, watch } from 'vue';
import { useRouter } from 'vue-router';
import {
  STAR_NUMBER,
  URLS,
  TEACHER_SECTIONS,
  RESERVATION_CALENDAR_KOR,
  RECORD_KOR,
  REVIEW_KOR,
} from '@/constants/constants';
import CardViewVue from '@/components/CardView.vue';
import CardViewContainerVue from '@/components/CardViewContainer.vue';
import PlainTextVue from '@/components/PlainText.vue';
import AButton from '@/components/AButton.vue';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { CONSULTING } from '@/constants/urls';
import TeacherCardVue from './TeacherCard.vue';
import '@/views/TeacherCard.scss';

const ICONS = [faRegularStar, faSolidStar];
ICONS.forEach((icon) => {
  library.add(icon);
});

interface IReviews {
  title: string;
  id: number | string;
  username: string;
  rate: boolean[];
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
    const teacherInfo = ref({
      name: '',
      image: '',
    });
    const reviews = ref<IReviews[]>([]);
    const days = ref<string[]>([]);
    const reserveDay = ref<Date>(new Date());
    const router = useRouter();
    const currentParams = +router.currentRoute.value.params.id;
    const isReservAvailable = ref(false);

    const currentDay = ref('');

    const attributes = ref({});

    function handleDayClick({ date }: DayClickProps) {
      const isReserved =
        toRaw(days.value) && toRaw(days.value).length > 0
          ? toRaw(days.value).filter((day) => String(day) === String(date)).length > 0
          : false;
      if (!isReserved) {
        isReservAvailable.value = true;
        reserveDay.value = date;
      } else {
        isReservAvailable.value = false;
      }
    }

    function handleReservation() {
      // eslint-disable-next-line no-alert
      alert(`${toRaw(currentDay.value)}로 예약이 완료되었습니다.`);
      router.push(`/${CONSULTING}`);
    }

    onMounted(() => {
      teacherInfo.value = URLS[currentParams];
      reviews.value = URLS[currentParams].teacherReview.map((el) => {
        const { title, id, username, rate } = el;
        return {
          title,
          id,
          username,
          rate: new Array(STAR_NUMBER).fill(false).map((_, i) => {
            if (i + 1 > rate) {
              return false;
            }
            return true;
          }),
        };
      });
      days.value = URLS[currentParams].teacherReservation as string[];

      // handleDayClick();
    });

    watch(days, (newVal) => {
      console.log('newVal: ', toRaw(newVal));
    });

    return {
      teacherInfo,
      handleDayClick,
      attributes,
      days,
      reserveDay,
      isReservAvailable,
      currentDay,
      handleReservation,
      reviews,
      TEACHER_SECTIONS,
      RESERVATION_CALENDAR_KOR,
      RECORD_KOR,
      date: ref('2022/06/03'),
      REVIEW_KOR,
    };
  },
});
</script>
<style lang="scss" module>
.teacherInfoBox {
  display: flex;
  flex-direction: row;
}

.calendarContainer {
  border: none;
  box-shadow: none;
  width: 100%;
}

.reservationBox {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.reviewContainer {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.reviewOuterBox {
  display: flex;
  gap: 8px;
  justify-content: space-between;
}

.reviewBox {
  display: flex;
  flex-direction: column;
  gap: 8px;
  line-height: 120%;
  width: 100%;
}

.reviewUsername {
  display: flex;
}

.starBox {
  display: flex;
  min-width: 90px;
}
</style>
