import { CONSULTING, DIARY } from '@/constants/urls';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { Ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

function useAuth() {
  const auth = getAuth();
  const router = useRouter();
  const authStore = useAuthStore();
  const authUser = reactive({ email: '', uid: '' });

  async function isUserLoggedIn() {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        authStore.$patch({
          auth: user,
        });
        authUser.email = user.email as string;
        authUser.uid = user.uid;
        console.log({ ...new Proxy(authUser, {}) });
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
        authStore.$patch({
          auth: user,
        });
        authUser.email = user.email as string;
        authUser.uid = user.uid;
        router.push(`/${DIARY}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log('errorCode, errorMessage', errorCode, errorMessage);
      });
  }

  async function handleLoginWithGoogle() {
    const provider = new GoogleAuthProvider().setCustomParameters({
      prompt: 'select_account',
    });
    signInWithPopup(auth, provider)
      .then((result) => {
        const { user } = result;

        authStore.$patch({
          auth: user,
        });
        authUser.email = user.email as string;
        authUser.uid = user.uid;
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
    router.push(`/${CONSULTING}`);
    authUser.email = '';
    authUser.uid = '';
  }

  return {
    isUserLoggedIn,
    handleLogin,
    authUser,
    handleLogout,
    handleLoginWithGoogle,
  };
}

export default useAuth;
