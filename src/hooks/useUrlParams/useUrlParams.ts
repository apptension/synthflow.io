import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { equals, filter, forEachObjIndexed, isEmpty, isNil, map, mergeDeepLeft, pick, prop } from "ramda";
import debounce from "lodash.debounce";
import { UrlConfig, UrlConfigKeys } from "./useUrlParams.types";
import { parseSequencerPattern } from "./useUrlParams.helpers";

type UrlHandlersType = Record<UrlConfigKeys, { value: any; setter: Dispatch<SetStateAction<any>> }>;

export const useUrlParams = (handlers: Partial<UrlHandlersType>) => {
	const history = useHistory();
	const location = useLocation();
	const [isUrlConfigSet, setIsUrlConfigSet] = useState(false);
	const [previousHandlersValues, setPreviousHandlersValues] = useState<any>();

	const getUrlValues = () => {
		const params = new URLSearchParams(location.search);
		let parsedValues: Record<string, any> = {};
		const configEntries = Array.from(params.entries());

		configEntries.forEach(([key, value]) => {
			switch (key) {
				case UrlConfigKeys.SEQUENCER_OCTAVES:
					parsedValues[key] = value.split("-");
					break;
				case UrlConfigKeys.SEQUENCER_PATTERN:
					const parsedPattern = parseSequencerPattern(value);
					if (!parsedPattern) return;
					parsedValues[key] = parsedPattern;
					break;
				default:
					const valueAsNumber = Number(value);
					parsedValues[key] = isNaN(valueAsNumber) ? value : valueAsNumber;
			}
		})

		return parsedValues;
	}

	const updateConfig = (newConfig: UrlConfig) => {
		const config = getUrlValues();
		const merged = mergeDeepLeft(newConfig, config);
		let stringifiedValues: Record<string, string> = {};
		const configEntries = Object.entries(merged);
		configEntries.forEach(([key, value]) => {
			if (key === UrlConfigKeys.SEQUENCER_PATTERN || key === UrlConfigKeys.SEQUENCER_OCTAVES) {
				stringifiedValues[key] = (value as any[]).flat().join("-");
			} else {
				stringifiedValues[key] = String(value);
			}
		})

		if (isEmpty(stringifiedValues)) return;
		debouncedSetParams(stringifiedValues);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedSetParams = useCallback(debounce((config: Record<string, string>) => {
		const params = new URLSearchParams(config);
		history.replace("?" + params.toString());
	}, 200), [])

	const preparedConfig = useMemo(() => {
		const config = getUrlValues();
		return pick(Object.keys(handlers), config);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.search]);

	useEffect(() => {
		if (!isUrlConfigSet) return;
		const handlersValues = Object.values(handlers).map(({ value }) => value);
		if (equals(previousHandlersValues, handlersValues)) return;
		setPreviousHandlersValues(handlersValues);

		const handlersObjects = map<any, Partial<UrlHandlersType>>(({ value }) => value, handlers);
		const filteredHandlers = filter<any>(value => !isNil(value), handlersObjects);
		updateConfig(filteredHandlers);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [handlers, isUrlConfigSet, previousHandlersValues]);

	useEffect(() => {
		forEachObjIndexed(({ value, setter }, key) => {
			const urlValue = prop<any, any>(key, preparedConfig);
			if (isNil(urlValue) || value === urlValue) return;
			setter(urlValue);
		}, handlers as Required<UrlHandlersType>)

		if (!isUrlConfigSet) {
			setIsUrlConfigSet(true);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [preparedConfig])
}