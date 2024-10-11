import {
    Attributes,
    Children,
    ElementNode,
    EventType,
    TagName,
    Variables,
} from './types';
import {
    isAttributeName,
    isAttributeValue,
    isChildren,
    isEventCallback,
    isEventType,
    isObject,
    isProperty,
} from './checks';

export function createClone<Tag extends TagName>(
    element: ElementNode<Tag>,
    index: number = 0,
    deep: boolean = true,
) {
    const node = typeof element === 'function' ? element(index) : element;

    return node.cloneNode(deep);
}

export function createElement<Tag extends TagName = 'div'>(
    props: Partial<Attributes<Tag>> & { tag?: Tag; children?: Children } = {},
): HTMLElementTagNameMap[Tag | 'div'] {
    const { tag = 'div', ...rest } = props;
    const attributes = rest as Partial<Attributes<Tag>>;
    const element = document.createElement(tag);

    for (const name in attributes) {
        if (!isProperty(attributes, name)) continue;

        const value = attributes[name];

        if (isEventType(name, element)) {
            const type = name.slice(2).toLowerCase() as EventType;

            if (isEventCallback<typeof type>(value)) {
                element.addEventListener(type, value);
            }
        } else if (isChildren(name, value)) {
            const children = Array.isArray(value) ? value : [value];

            element.append(...children);
        } else if (isAttributeName(name, element) && isAttributeValue(value)) {
            element.setAttribute(
                name === 'className' ? 'class' : name,
                value as string,
            );
        }
    }

    return element;
}

export function createElements<Tag extends TagName = 'div'>(
    length: number = 1,
    element: ElementNode<Tag> = createElement(),
    deep: boolean = true,
) {
    if (length < 1) return [];

    if (length === 1) return createClone(element, 0, deep);

    return Array.from({ length }, (_, index: number) =>
        createClone(element, index, deep),
    );
}

export function cssVariables(variables: Variables, prefix: string = '') {
    const result: string[] = [];

    for (const [key, value] of Object.entries(variables)) {
        const variable = prefix === '' ? key : `${prefix}-${key}`;

        if (isAttributeValue(value)) {
            result.push(`--${variable}:${value}`);
        } else if (isObject(value)) {
            result.push(cssVariables(value, variable));
        }
    }

    return result.join(';');
}

export function keys<T extends object>(obj: T): Array<keyof T> {
    return Object.keys(obj) as Array<keyof T>;
}

export function values<T extends object>(obj: T): [T[keyof T]][] {
    return Object.values(obj) as [T[keyof T]][];
}

export function entries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
}
