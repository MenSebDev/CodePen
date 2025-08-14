import {
    createElement,
    createElements,
    cssVariables,
    entries,
} from '../../utilities';
import { isFloat } from '../../checks';
import './index.scss';

export type Size = number | string;

export type KosmosEyeProps = {
    radius: number;
    length: {
        lines: number;
        rays: number;
    };
    size: {
        box: number;
        eye: number;
        sun: number;
        ray: number;
        space: number;
        cover: number;
    };

    color: {
        background: string;
        stroke: string;
        fill: string;
        hover: string;
    };
    time: {
        rotate: number;
    };
};

export type KosmosEyeOptions = KosmosEyeProps & {
    diameter: number;
    distance: number;
    angle: {
        line: number;
        theta: number;
        ray: number;
    };
};

export const propKosmosEye: KosmosEyeProps = {
    radius: 42.5,
    length: {
        lines: 52,
        rays: 26,
    },
    size: {
        box: 1.0,
        cover: 1.1,
        eye: 0.5,
        sun: 0.125,
        ray: 0.03125,
        space: 0.01,
    },
    color: {
        background: '#240041',
        stroke: '#900048',
        fill: '#ff4057',
        hover: '#ff8260',
    },
    time: {
        rotate: 15,
    },
};

export function processKosmosEye(props: KosmosEyeProps): KosmosEyeOptions {
    const result: KosmosEyeProps = Object.assign({}, props);

    const diameter = props.radius * 2;
    const angle = 360 / props.length.lines;

    for (const [key, val] of entries(props.size)) {
        result.size[key] = val * diameter;
    }

    return Object.assign(result, {
        angle: {
            line: angle * 2,
            theta: angle,
            ray: 360 / props.length.rays,
        },
        diameter,
        distance: (0.95 * result.size.sun) / 2 + result.size.ray / 2,
    });
}

export function KosmosEye(props: KosmosEyeProps = propKosmosEye) {
    const options = processKosmosEye(props);

    const lines = createElements(options.length.lines / 2, (index: number) => {
        return createElement({
            className: 'line',
            style: cssVariables({
                angle: { line: options.angle.line * index },
            }),
        });
    });

    const rays = createElements(options.length.rays / 2, (index: number) => {
        return createElement({
            className: 'ray',
            style: cssVariables({
                angle: { ray: options.angle.ray * index },
            }),
        });
    });

    const style = cssVariables(options);

    return createElement({
        style,
        className: 'kosmos',
        children: [
            createElement({ className: 'box', children: lines }),
            createElement({ className: 'eye' }),
            createElement({ className: 'sun', children: rays }),
        ],
    });
}
