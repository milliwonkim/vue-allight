import { ref } from 'vue';
import { useRouter } from 'vue-router';

function useDrawer() {
  const router = useRouter();
  const isDrawerShow = ref(false);
  const handleRoute = (link: string) => {
    if (window.location.pathname !== link) {
      if (link) {
        router.push(link);
      }
    }
  };

  const handleShowDrawer = () => {
    isDrawerShow.value = !isDrawerShow.value;
  };

  const handleCancelDrawer = () => {
    isDrawerShow.value = false;
  };

  return {
    isDrawerShow,
    handleRoute,
    handleShowDrawer,
    handleCancelDrawer,
  };
}

export default useDrawer;
