import { useCssModule } from 'vue';

interface CssModuleProps {
  [key: string]: {
    [key: string]: string;
  };
}

interface ICssModule {
  [key: string]: string;
}

function useGetCssModule({ cssModuleProps }: CssModuleProps) {
  const cssModuleObject = cssModuleProps.value;

  const $style = useCssModule();
  const cssModuleObj = {};

  const cssModules =
    Object.entries(cssModuleObject).length > 0
      ? Object.entries(cssModuleObject).reduce((obj, target) => {
        const [key, val] = target;
        if (!obj[key]) {
          obj[`${key}s`] = $style[val];
        }

        return obj;
      }, cssModuleObj as ICssModule)
      : {};

  console.log('1111', cssModules);

  return { cssModules };
}

export default useGetCssModule;
