import { JSX } from 'preact';

export type ElementNode<Tag extends TagName> =
    | HTMLElementTagNameMap[Tag]
    | HTMLDivElement
    | ((index: number) => HTMLElementTagNameMap[Tag] | HTMLDivElement);

export type Child = string | Node;
export type Children = Child | Child[];

export type TagName = keyof HTMLElementTagNameMap;

export type AttributeValue = string | number | boolean;
export type Attributes<Tag extends TagName> = JSX.IntrinsicElements[Tag];

export type EventType = keyof HTMLElementEventMap;
export type EventCallback<Type extends EventType> = (
    event: HTMLElementEventMap[Type],
) => void;
export type Events = {
    [Type in EventType]: EventCallback<Type>;
};

export type Variable = string | number | boolean;
export type Variables = {
    [key: string]: Variable | Variables;
};
