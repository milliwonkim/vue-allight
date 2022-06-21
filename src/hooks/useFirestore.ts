import { firebaseConfig } from '@/firebase';
import { doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import useAuth from '@/hooks/useAuth';
import { DIARY } from '@/constants/urls';
import { useRouter } from 'vue-router';
import { useDiariesStore } from '../store/diaries';

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

function useFirestore() {
  const { authUser } = useAuth();
  const router = useRouter();
  const diaries = useDiariesStore();
  async function postMyDiary(title: string, contents: string) {
    try {
      const docRef = doc(db, 'my-diary', authUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const newDocSnap = [...docSnap.data().diary];
        newDocSnap.push({
          title,
          contents,
          date: new Date(),
          id: newDocSnap[newDocSnap.length - 1].id + 1,
        });
        await updateDoc(doc(db, 'my-diary', authUser.uid), {
          diary: newDocSnap,
        });

        diaries.$patch({ diaries: newDocSnap });
        router.push(`/${DIARY}`);
      } else {
        console.log('no document');
      }
    } catch (error) {
      console.log('updateDiaries error: ', error);
    }
  }

  return {
    postMyDiary,
  };
}

export default useFirestore;
