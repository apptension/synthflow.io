export type RegisteredComponent<T> = {
	register: (component: T) => void;
}