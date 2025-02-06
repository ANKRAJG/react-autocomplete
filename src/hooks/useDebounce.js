import { useCallback } from "react";

const useDebounce = () => {
    const debounce = useCallback((fn, delay=500) => {
        let timer;
        return function() {
            const ctx = this;
            const args = arguments;
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(ctx, args);
            }, delay)
        };
    }, []);

    return { debounce };
}

export default useDebounce;