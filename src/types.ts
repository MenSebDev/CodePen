export type Tags = keyof HTMLElementTagNameMap;
export type Elements = HTMLElementTagNameMap[Tags];

export type ElementNode<Tag extends Tags = 'div'> = HTMLElementTagNameMap[Tag];
export type ElementCallback<Tag extends Tags = 'div'> = (
    index: number,
) => ElementNode<Tag>;

export type Child = string | Node;
export type Children = Child | Child[];

export type AttributeValue = string | number | boolean;
export type AttributeKeys<E extends Elements> = {
    [K in keyof E]: E[K] extends AttributeValue ? K : never;
}[keyof E];
export type Attributes<Tag extends Tags> = Partial<
    Pick<HTMLElementTagNameMap[Tag], AttributeKeys<HTMLElementTagNameMap[Tag]>>
>;

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
