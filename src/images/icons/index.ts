import { FunctionComponent, SVGProps } from "react";
import styled, { css } from "styled-components/macro";

import { ReactComponent as SlidersImg } from "./sliders.svg";
import { ReactComponent as SinImg } from "./sin.svg";
import { ReactComponent as SquareImg } from "./square.svg";
import { ReactComponent as SawtoothImg } from "./sawtooth.svg";
import { ReactComponent as PauseImg} from "./pause.svg";
import { ReactComponent as PlayImg} from "./play.svg";
import { ReactComponent as ShareImg} from "./share.svg";

export type IconComponentProps = {
	color?: string;
	size?: number;
};

const makeIcon = (ImgComponent: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }>) => {
	return styled(ImgComponent)<IconComponentProps>`
    ${({ size }) => size && css`
      width: ${size}rem;
      height: ${size}rem;
    `}

    ${({ color }) => color && css`
      path {
        fill: ${color};
      }
    `}
	`;
};

export const SlidersIcon = makeIcon(SlidersImg);
export const SinWaveIcon = makeIcon(SinImg);
export const SquareWaveIcon = makeIcon(SquareImg);
export const SawtoothWaveIcon = makeIcon(SawtoothImg);
export const PlayIcon = makeIcon(PlayImg);
export const PauseIcon = makeIcon(PauseImg);
export const ShareIcon = makeIcon(ShareImg);
