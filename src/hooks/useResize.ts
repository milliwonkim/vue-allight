import { onMounted, onUnmounted, Ref } from 'vue';

interface IRefs {
  clientWidth: number;
}

function useResize(refs: Ref<IRefs>, result: Ref<boolean>): void {
  const handleWidth = () => {
    const refsObject = result;
    if (refs.value.clientWidth < 640) {
      refsObject.value = true;
    } else {
      refsObject.value = false;
    }
  };

  onMounted(() => {
    handleWidth();
    window.addEventListener('resize', handleWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleWidth);
  });
}

export default useResize;
