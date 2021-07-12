import { useLayoutEffect, useState } from "react";

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0,
	});
	useLayoutEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowSize;
}