import { FunctionComponent, SVGProps } from "react";
import styled from "styled-components";

export type IconComponentProps = {
	color?: string;
	size?: number;
};

const makeIcon = (ImgComponent: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }>) => {
	return styled(ImgComponent)<IconComponentProps>`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;

    path {
      fill: ${({ color }) => color};
    }
  `;
};
