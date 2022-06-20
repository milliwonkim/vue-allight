import { firebaseConfig } from '@/firebase';
import { doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

function useFirestore() {
  async function postMyDiary(title: string, contents: string) {
    try {
      const docRef = doc(db, 'my-diary', 'diary-2');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const newDocSnap = [...docSnap.data().diary];
        newDocSnap.push({
          title,
          contents,
          date: new Date(),
          id: newDocSnap[newDocSnap.length - 1].id + 1,
        });
        console.log('newDocSnap: ', newDocSnap);
        await updateDoc(doc(db, 'my-diary', 'diary-2'), {
          diary: newDocSnap,
        });
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
