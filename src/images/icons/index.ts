import { FunctionComponent, SVGProps } from "react";
import styled, { css } from "styled-components/macro";

import { ReactComponent as SlidersImg } from "./sliders.svg";

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
