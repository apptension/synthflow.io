import { ThemeProvider } from "styled-components";
import { useContext } from "react";
import { Header } from "../UI/header"
import { Container } from "./layout.style"
import { Visualisation } from "../visualisation";
import { Synthesizer } from "../synthesizer";
import { Footer } from "../UI/footer";
import { Toast } from "../UI/toast";
import { useShowMobileLayout } from "../../hooks";
import { AppSettingsProvider } from "../../providers";

export const Layout = () => {
	const showMobileLayout = useShowMobileLayout();
	const { showControls } = useContext(AppSettingsProvider.Context);
	return (
		<Container>
			<Toast />
			<Header />
			<ThemeProvider theme={{ isSynthVisible: showControls && !showMobileLayout }}>
				<Visualisation />
				<Synthesizer />
				<Footer />
			</ThemeProvider>
		</Container>
	)
}