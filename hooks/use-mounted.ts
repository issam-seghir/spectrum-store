import { useSyncExternalStore } from "react";

// hook to prevent nextjs hydration error
//? see : https://nextjs.org/docs/messages/react-hydration-error

//? The answer flips once at hydration and never changes again, so there is
//? nothing to subscribe to. useSyncExternalStore gives us the server snapshot
//? (false) on the server and during hydration, then the client snapshot (true).
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function useMounted() {
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
