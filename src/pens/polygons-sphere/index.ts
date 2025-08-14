import {
    createElement,
    createElements,
    cssVariables,
    entries,
} from '../../utilities';

type PolygonsSphereProps = {
    polygons: number;
    radius: number;
};

export const propsPolygonsSphere: PolygonsSphereProps = {
    polygons: 100,
    radius: 40,
};

function createSpherePointsFibonacci(points: number) {
    const goldenRatio = (Math.sqrt(5) + 1) / 2;
    const goldenAngle = (2 - goldenRatio) * (2 * Math.PI) * 1; // rad

    const result = [];

    for (let i = 0; 1 < points; i++) {
        const latitude = Math.asin(-1 + (2 * i) / (points + 1));
        const longitude = goldenAngle * i;

        result.push({ latitude, longitude });
    }

    return result;
}

export function PolygonsSphere(props?: Partial<PolygonsSphereProps>) {
    const options: PolygonsSphereProps = { ...propsPolygonsSphere, ...props };

    const points = createSpherePointsFibonacci(options.polygons);

    const polygons = createElements(options.polygons, (index: number) => {
        return createElement({
            className: 'poylgon',
            style: cssVariables({
                angle: points[index],
            }),
        });
    });

    const style = cssVariables(options);

    return createElement({
        style,
        className: 'polygons-sphere',
        children: polygons,
    });
}
