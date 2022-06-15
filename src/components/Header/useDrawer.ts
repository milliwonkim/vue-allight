import { ref } from 'vue';
import { useRouter } from 'vue-router';

function useDrawer() {
  const router = useRouter();
  const isDrawerShow = ref(false);
  const handleRoute = (link: string, isMobile: boolean) => {
    if (window.location.pathname !== link) {
      if (link) {
        router.push(link);
      }
    }

    if (isMobile) {
      isDrawerShow.value = false;
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
