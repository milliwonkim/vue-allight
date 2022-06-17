import { DIARY } from '@/constants/urls';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { Ref, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

function useAuth() {
  const auth = getAuth();
  const router = useRouter();
  const authStore = useAuthStore();
  const authUser = ref({});

  async function isUserLoggedIn() {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        authStore.$patch({
          auth: user,
        });
        authUser.value = {
          email: user.email as string,
          uid: user.uid,
        };
      } else {
        console.log('user not logged in');
      }
    });
  }

  async function handleLogin(userInfo: Ref<{ id: string; password: string }>) {
    await signInWithEmailAndPassword(
      auth,
      userInfo.value.id,
      userInfo.value.password,
    )
      .then((data) => {
        const { user } = data;
        console.log('user: ', user);
        authStore.$patch({
          auth: user,
        });
        router.push(`/${DIARY}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log('errorCode, errorMessage', errorCode, errorMessage);
      });
  }

  async function handleLoginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { user } = result;
        console.log('user: ', user);
        router.push(`/${DIARY}`);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
  }

  async function handleLogout() {
    await signOut(auth);
    authUser.value = {};
  }

  onMounted(() => {
    isUserLoggedIn();
  });

  return {
    isUserLoggedIn,
    handleLogin,
    authUser,
    handleLogout,
    handleLoginWithGoogle,
  };
}

export default useAuth;
