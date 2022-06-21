<template>
  <div>
    <card-view-container>
      <card-view-box
        @click="handleRoute(`/${DIARY_DETAIL}/${diary.id}`)"
        class="card-view-box"
        :key="diary.id"
        v-for="diary in diarys"
      >
        <div :class="['card-view-box', { 'fixed-width': isFixedWidth }]">
          <div class="teacher-info-inner-container">
            <div class="teacher-info-box">
              <p class="teacher-name-label">
                {{ diary.title }}
              </p>
              <plain-text color="sub-default" fontSize="small">
                {{ getDate(diary.date) }}
              </plain-text>
              <div class="section-box">
                <plain-text fontWeight="700">{{ diary.contents }}</plain-text>
              </div>
            </div>
          </div>
          <font-awesome-icon
            class="teacher-route-button"
            icon="fa-solid fa-chevron-right"
          />
        </div>
      </card-view-box>
    </card-view-container>
    <div class="write-diary-wrapper">
      <a-button @clickHandler="handleRoute(`/${DIARY}/${WRITE_MY_DIARY}`)"
        >일기쓰기</a-button
      >
    </div>
  </div>
</template>
<script lang="ts">
import CardViewContainerVue from "@/components/CardViewContainer.vue";
import { defineComponent, ref, watch } from "vue";
import CardViewBox from "@/components/CardViewBox.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import PlainTextVue from "@/components/PlainText.vue";
import { useRouter } from "vue-router";
import { DIARY, DIARY_DETAIL, WRITE_MY_DIARY } from "@/constants/urls";
import AButtonVue from "@/components/AButton.vue";
import { db } from "@/hooks/useFirestore";
import { doc, getDoc } from "firebase/firestore";
import useAuth from "@/hooks/useAuth";
import { getDate } from "../../utils/getDate";
import { useDiariesStore } from "../../store/diaries";

library.add(faChevronRight);

interface IDiary {
  title: string;
  id: number;
  date: Date;
  contents: string;
}

export default defineComponent({
  components: {
    "card-view-container": CardViewContainerVue,
    "card-view-box": CardViewBox,
    "plain-text": PlainTextVue,
    "a-button": AButtonVue,
  },
  props: ["isFixedWidth"],
  setup() {
    const router = useRouter();
    const diaries = useDiariesStore();
    const { authUser } = useAuth();
    const diarys = ref<IDiary[]>([]);

    async function getDiaries() {
      try {
        const docRef = doc(db, "my-diary", authUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const newDocSnap = docSnap
            .data()
            .diary.map((el: { date: { toDate: () => Date } }) => ({
              ...el,
              date: el.date.toDate(),
            }));
          console.log("docSnap", newDocSnap);
          diaries.$patch({ diaries: newDocSnap });
        } else {
          diaries.$patch({ diaries: [] });
        }
      } catch (error) {
        console.log("getDiaries error: ", error);
      }
    }

    watch(authUser, (newVal) => {
      if (newVal.email) {
        getDiaries();
      }
    });

    watch(diaries, (newVal) => {
      // diarys.value = destructProxyObj(newVal.$state).diaries;
      diarys.value = newVal.diaries;
    });

    function handleRoute(link: string) {
      router.push(link);
    }

    return {
      diaries,
      diarys,
      handleRoute,
      getDate,
      DIARY_DETAIL,
      WRITE_MY_DIARY,
      DIARY,
    };
  },
});
</script>
<style lang="scss" scoped>
.card-view-box {
  display: flex;
  gap: 16px;
  justify-content: space-between;
}

.fixed-width {
  @extend .card-view-box;
  max-width: 400px;
}

.teacher-info-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  @media (max-width: 450px) {
    width: 100%;
  }
}

.teacher-name-label {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  color: #000000;
  font-size: 24px;
  font-weight: 800;
}

.teacher-label {
  color: $sub-default-color;
  font-size: 16px;
  font-weight: 600;
}

.current-job-label {
  color: $sub-default-color;
  font-weight: 700;
}

.section-box {
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: 600;
  color: $sub-default-color;
}

.price-box {
  display: flex;
  gap: 8px;
  justify-content: space-between;
  color: $sub-default-color;
}

.teacher-route-button {
  display: inline-block;
  margin: auto 0;
}

.teacher-info-inner-container {
  display: flex;
  gap: 16px;
  justify-content: flex-start;
}

.card-view-box {
  cursor: pointer;
}

.card-view-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.write-diary-wrapper {
  position: sticky;
  display: flex;
  justify-content: flex-end;
  bottom: 0;
  padding: 0 0 16px 0;
}
</style>
