<template>
  <div data-aos="fade-up">
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
        <plain-text fontWeight="700" color="sub-default">
          {{ section.name }}
        </plain-text>
        <div class="review-container" v-if="section.name === RECORD_KOR">
          <div class="review-outer-box" :key="record.id" v-for="record in records">
            <plain-text fontWeight="700" color="sub-default"
              >{{ record.period.from }} ~ {{ record.period.to || "현재" }}</plain-text
            >
            <div class="review-box" :key="content" v-for="content in record.contents">
              {{ content }}
            </div>
          </div>
        </div>
        <div class="review-container" v-if="section.name === REVIEW_KOR">
          <div class="review-outer-box" :key="review.id" v-for="review in reviews">
            <plain-text fontWeight="700" color="sub-default">{{
              review.username
            }}</plain-text>
            <div class="review-box">
              {{ review.title }}
            </div>
            <div class="star-box">
              <div :key="i" v-for="(r, i) in review.rate">
                <font-awesome-icon v-if="r" icon="fa-solid fa-star" />
                <font-awesome-icon v-else icon="fa-regular fa-star" />
              </div>
            </div>
          </div>
        </div>
        <div v-if="section.name === RESERVATION_CALENDAR_KOR">
          <q-date
            v-model="reserveDay"
            :events="days"
            minimal
            class="calendar-container"
          />
        </div>
        <div v-if="section.id === 2">
          <div class="reservation-box" v-if="isReservAvailable">
            <plain-text fontWeight="700" color="sub-default">
              {{ !!reserveDay ? `${reserveDay} (예약가능)` : "날짜를 선택해주세요." }}
            </plain-text>
            <a-button @click="handleReservation">예약하기</a-button>
          </div>
          <div v-else>
            <plain-text fontWeight="700" color="sub-default"> 예약 불가능 </plain-text>
          </div>
        </div>
      </card-view>
    </card-view-container>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, toRaw, watch } from "vue";
import { useRouter } from "vue-router";
import {
  STAR_NUMBER,
  CONSULTING_TEACHERS,
  TEACHER_SECTIONS,
  RESERVATION_CALENDAR_KOR,
  RECORD_KOR,
  REVIEW_KOR,
} from "@/constants/constants";
import CardViewVue from "@/components/CardView.vue";
import CardViewContainerVue from "@/components/CardViewContainer.vue";
import PlainTextVue from "@/components/PlainText.vue";
import AButton from "@/components/AButton.vue";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";
import useAuth from "@/hooks/useAuth";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import dayjs from "dayjs";
import { CONSULTING } from "@/constants/urls";
import TeacherCardVue from "./TeacherCard.vue";
import "@/views/TeacherCard.scss";

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

interface IRecords {
  period: {
    from: string;
    to: string | null;
  };
  contents: string[];
  id: number;
}

export default defineComponent({
  components: {
    "teacher-card": TeacherCardVue,
    "card-view": CardViewVue,
    "card-view-container": CardViewContainerVue,
    "plain-text": PlainTextVue,
    "a-button": AButton,
  },
  setup() {
    const teacherInfo = ref({
      name: "",
      image: "",
    });
    const reviews = ref<IReviews[]>([]);
    const records = ref<IRecords[]>([]);
    const days = ref<string[]>([]);
    const reserveDay = ref<Date | string>(new Date());
    const router = useRouter();
    const currentParams = Number(router.currentRoute.value.params.id);
    console.log("currentParams: ", currentParams);
    const isReservAvailable = ref(false);

    const currentDay = ref("");

    const attributes = ref({});
    const { authUser } = useAuth();

    function handleDayClick(date: Date | string) {
      console.log("ZZZZ", JSON.parse(JSON.stringify(authUser)));
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

    function eventsFn(date: string) {
      if (!days.value.includes(date)) {
        return false;
      }

      return true;
    }

    function handleReservation() {
      if (toRaw(reserveDay).value) {
        // eslint-disable-next-line no-alert
        alert(`${toRaw(reserveDay.value)}로 예약이 완료되었습니다.`);
        router.push(`/${CONSULTING}`);
      }
    }

    onMounted(() => {
      teacherInfo.value = CONSULTING_TEACHERS[currentParams];
      reviews.value = CONSULTING_TEACHERS[currentParams].teacherReview.map((el) => {
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
      days.value = CONSULTING_TEACHERS[currentParams].teacherReservation;
      records.value = CONSULTING_TEACHERS[currentParams].teacherRecords;

      handleDayClick(dayjs(new Date()).format("YYYY/MM/DD"));
    });

    watch([reserveDay, authUser], ([newReserveDay]) => {
      handleDayClick(toRaw(newReserveDay));
    });

    return {
      teacherInfo,
      eventsFn,
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
      REVIEW_KOR,
      records,
    };
  },
});
</script>
<style lang="scss" scoped>
.calendar-container {
  border: none;
  box-shadow: none;
  width: 100%;
}

.reservation-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review-outer-box {
  display: flex;
  gap: 8px;
  justify-content: space-between;
}

.review-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
  line-height: 120%;
  width: 100%;
}

.star-box {
  display: flex;
  min-width: 90px;
}
</style>
