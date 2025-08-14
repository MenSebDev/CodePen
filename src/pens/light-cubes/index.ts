import { createElement, createElements, cssVariables } from '../../utilities';

type LightCubesProps = {
    dimension: number;
    sizes: {
        edge: number;
        vertex: number;
    };
};

export const propsLightCubes: LightCubesProps = {
    dimension: 1,
    sizes: {
        edge: 15,
        vertex: 5,
    },
};

export function createBlock({
    className = '',
    face = createElement({ className: 'face' }),
}) {
    const faces = createElements(6, face);
    const block = createElement({
        className: `block ${className}`,
        children: faces,
    });

    return block;
}

export function LightCubes(props?: Partial<LightCubesProps>) {
    const options: LightCubesProps = { ...propsLightCubes, ...props };

    const face = createElement({ className: 'face' });
    const faces = createElements(6, face);
    const block = createElement({
        className: 'block',
        children: faces,
    });
    const cube = createElement({
        className: 'cube',
        children: block.cloneNode(true),
    });

    const row = createElement({
        className: 'row',
        children: createElements(options.dimension * 2 + 1, cube),
    });
    const col = createElement({
        className: 'col',
        children: createElements(options.dimension + 1, cube),
    });
    const rows = createElement({
        className: 'rows',
        children: createElements(options.dimension + 1, row),
    });
    const cols = createElement({
        className: 'cols',
        children: createElements(options.dimension, row),
    });

    const slice = createElement({
        className: 'slice',
        children: Array.from({ length: options.dimension + 1 }, (_, index) => {
            const element = index % 2 == 0 ? rows : cols;

            return element.cloneNode(true);
        }),
    });

    const cubes = createElements(options.dimension * options.dimension, cube);
    const frame = createElement({ className: 'frame', children: cubes });

    const style = cssVariables(options);

    return createElement({
        style,
        className: 'light-cubes',
        children: slice,
    });
}
