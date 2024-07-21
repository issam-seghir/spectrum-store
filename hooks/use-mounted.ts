import React from "react";

// hook to prevent nextjs hydration error
//? see : https://nextjs.org/docs/messages/react-hydration-error

export function useMounted() {
	const [isMounted, setIsMounted] = React.useState(false);

	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	return isMounted;
}
