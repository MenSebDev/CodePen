import {
    Tags,
    AttributeValue,
    Attributes,
    EventType,
    EventCallback,
    Variable,
    Variables,
} from './types';

export function isFloat(value: number) {
    return value !== Math.floor(value);
}

// This could be optimized
export function isObject(obj: unknown): obj is Variables {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}

export function isProperty(obj: unknown, key: PropertyKey) {
    return isObject(obj) && Object.prototype.hasOwnProperty.call(obj, key);
}

export function isVariable(value: unknown): value is Variable {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
    );
}

export function isVariables(obj: unknown): obj is Variables {
    if (!isObject(obj)) return false;

    for (const key of Object.keys(obj)) {
        const value = obj[key];

        if (!(isVariable(value) || isVariables(value))) return false;
    }

    return true;
}

export function isAttributeName<Tag extends Tags>(
    name: unknown,
    element: HTMLElementTagNameMap[Tag],
): name is keyof Attributes<Tag> {
    return typeof name === 'string' && name in element;
}

export function isAttributeValue(value: unknown): value is AttributeValue {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
    );
}

export function isEventType(
    type: unknown,
    element: HTMLElement,
): type is `on${Capitalize<EventType>}` {
    return (
        typeof type === 'string' &&
        type.startsWith('on') &&
        type.slice(2).toLowerCase() in element
    );
}

export function isEventCallback<Type extends EventType>(
    callback: unknown,
): callback is EventCallback<Type> {
    return typeof callback === 'function';
}

export function isChild(child: unknown): child is HTMLElement {
    return child instanceof Node || typeof child === 'string';
}

export function isChildren<Tag extends Tags>(
    name: unknown,
    children: unknown,
): children is HTMLElementTagNameMap[Tag][] {
    return (
        name === 'children' &&
        (Array.isArray(children) ? children.every(isChild) : isChild(children))
    );
}
