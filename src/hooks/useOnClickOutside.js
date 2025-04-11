import { useEffect } from "react"

const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (e) => {
            console.log("ref", ref.current);
            if (!ref.current || ref.current.contains(e.target)) {
                return ;
            }
            handler();
        };


        document.addEventListener("mousedown", listener)
        document.addEventListener("touchstart", listener)
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener)
        };
    }, []);
};

export default useOnClickOutside;
