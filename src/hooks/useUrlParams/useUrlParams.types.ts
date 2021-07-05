export enum UrlConfigKeys {
	OSC_1_WAVE= 'ow1',
	OSC_2_WAVE = 'ow2',
	OSC_1_DETUNE = 'od1',
	OSC_2_DETUNE = 'od2',
	ENV_ATTACK = 'ea',
	ENV_RELEASE = 'er',
	ENV_SUSTAIN = 'es',
	ENV_DECAY = 'ed',
	BPM = 'b',
	MASTER = 'm',
	FILTER = 'f',
	NOISE ='n',
	REVERB = 'r',
	CHEBYSHEV = 'c'
}

export type UrlConfig = Partial<{
	[UrlConfigKeys.OSC_1_WAVE]: string;
	[UrlConfigKeys.OSC_2_WAVE]: string;
	[UrlConfigKeys.OSC_1_DETUNE]: number;
	[UrlConfigKeys.OSC_2_DETUNE]: number;
	[UrlConfigKeys.ENV_ATTACK]: number;
	[UrlConfigKeys.ENV_RELEASE]: number;
	[UrlConfigKeys.ENV_SUSTAIN]: number;
	[UrlConfigKeys.ENV_DECAY]: number;
	[UrlConfigKeys.BPM]: number;
	[UrlConfigKeys.MASTER]: number;
	[UrlConfigKeys.FILTER]: number;
	[UrlConfigKeys.NOISE]: number;
	[UrlConfigKeys.REVERB]: number;
	[UrlConfigKeys.CHEBYSHEV]: number;
}>;
