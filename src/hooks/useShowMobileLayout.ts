import { isMobile } from "react-device-detect";
import { useWindowSize } from "./useWindowSize";

export const useShowMobileLayout = () => {
	const { width } = useWindowSize();

	return isMobile || width < 1150;
}