import { createElement } from './utilities';
// import { KosmosEye } from './pens/kosmos-eye';

const el = createElement({
    children: [
        createElement({
            className: 'child',
        }),
    ],
    className: 'test',
});

// console.log({ el });

// document.body.appendChild(KosmosEye());
document.body.appendChild(el);
