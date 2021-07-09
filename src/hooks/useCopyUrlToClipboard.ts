import { useContext, useEffect } from "react";
import { AppSettingsProvider } from "../providers";

export const useCopyUrlToClipboard = () => {
	const { isUrlCopied, setIsUrlCopied } = useContext(AppSettingsProvider.Context);

	useEffect(() => {
		if (isUrlCopied) {
			setTimeout(() => {
				setIsUrlCopied(false);
			}, 3000)
		}
	}, [isUrlCopied]);

	const copyUrl = () => {
		const el = document.createElement("input");
		el.value = window.location.href;
		document.body.appendChild(el);
		el.select();
		document.execCommand("copy");
		document.body.removeChild(el);
		setIsUrlCopied(true);
	}
	return { copyUrl, isUrlCopied };
}