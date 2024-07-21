import React from "react";

export default function useTimeout(
    callback: () => void,
    delay: number | null,
): React.RefObject<number | null> {
    const timeoutRef = React.useRef<number | null>(null);
    const savedCallback = React.useRef(callback);

    // Update saved callback if the callback function changes
    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set or clear the timeout based on the delay
    React.useEffect(() => {
        const tick = () => savedCallback.current();

        if (typeof delay === "number") {
            timeoutRef.current = window.setTimeout(tick, delay);
            return () => window.clearTimeout(timeoutRef.current ?? undefined);
        }

        // Clear the timeout if delay is null
        return () => {
            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [delay]);

    return timeoutRef;
}
