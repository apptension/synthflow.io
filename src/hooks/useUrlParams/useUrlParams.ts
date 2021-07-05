import { useHistory, useLocation } from "react-router";
import { UrlConfig, UrlConfigKeys } from "./useUrlParams.types";
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { equals, filter, forEachObjIndexed, isEmpty, map, mergeDeepLeft, pick, prop } from "ramda";
import debounce from "lodash.debounce";

type UrlHandlersType = Record<UrlConfigKeys, { value: string | number; setter: Dispatch<SetStateAction<any>> }>;

export const useUrlParams = (handlers: Partial<UrlHandlersType>) => {
	const history = useHistory();
	const location = useLocation();
	const [isUrlConfigSet, setIsUrlConfigSet] = useState(false);
	const [previousHandlersValues, setPreviousHandlersValues] = useState<any>();

	const getUrlValues = () => {
		const params = new URLSearchParams(location.search);
		let parsedValues: Record<string, string | number> = {};
		const configEntries = Array.from(params.entries());
		configEntries.forEach(([key, value]) => {
			const valueAsNumber = Number(value);
			parsedValues[key] = isNaN(valueAsNumber) ? value : valueAsNumber;
		})

		return parsedValues;
	}

	const updateConfig = (newConfig: UrlConfig) => {
		const config = getUrlValues();
		const merged = mergeDeepLeft(newConfig, config);
		let stringifiedValues: Record<string, string> = {};
		const configEntries = Object.entries(merged);
		configEntries.forEach(([key, value]) => {
			stringifiedValues[key] = String(value);
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

		const handlersObjects = map<any, any>(({ value }) => value, handlers);
		const filteredHandlers = filter<any>(value => value, handlersObjects);
		updateConfig((filteredHandlers as unknown) as UrlConfig)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [handlers, isUrlConfigSet, previousHandlersValues]);

	useEffect(() => {
		forEachObjIndexed(({ value, setter }, key) => {
			const urlValue = prop<any, any>(key, preparedConfig);
			if (!urlValue || value === urlValue) return;

			setter(urlValue);
		}, handlers as Required<UrlHandlersType>)

		if (!isUrlConfigSet) {
			setIsUrlConfigSet(true);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [preparedConfig])

	const getValues = () => {

	}

	return { getValues }
}