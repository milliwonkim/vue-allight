<template>
  <div class="diary-detail-container">
    <plain-text fontWeight="700" color="black" fontSize="large">
      {{ diary.title }}
    </plain-text>
    <plain-text color="sub-default" fontSize="small" class="diary-detail-contents">
      {{ getDate(diary.date) }}
    </plain-text>
    <div class="diary-detail-contents">
      <plain-text fontWeight="500" color="sub-default" fontSize="medium">
        {{ diary.contents }}
      </plain-text>
    </div>
  </div>
</template>
<script lang="ts">
import PlainTextVue from "@/components/PlainText.vue";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/hooks/useFirestore";
import { getDate } from "../../utils/getDate";

interface INewDoc {
  contents: string;
  date: Date;
  id: number;
  title: string;
}

export default defineComponent({
  components: {
    "plain-text": PlainTextVue,
  },
  setup() {
    const diary = ref({});
    const router = useRouter();
    const currentParams = Number(router.currentRoute.value.params.id);

    async function getDiary() {
      try {
        const docRef = doc(db, "my-diary", "diary-2");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const newDocSnap: INewDoc[] = docSnap
            .data()
            .diary.map((el: { date: { toDate: () => Date } }) => ({
              ...el,
              date: el.date.toDate(),
            }));

          console.log("newDocSnap: ", newDocSnap);

          const [data] = newDocSnap.filter((el) => el.id === currentParams);
          diary.value = data;
        } else {
          diary.value = { title: "", contents: "", date: new Date(), id: 9999 };
        }
      } catch (error) {
        console.log("getDiaries error: ", error);
      }
    }

    onMounted(() => {
      getDiary();
    });

    return {
      diary,
      getDate,
    };
  },
});
</script>
<style lang="scss" scoped>
.diary-detail-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.diary-detail-contents {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
