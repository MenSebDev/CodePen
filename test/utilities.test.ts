import { createElement } from '../src/utilities';

describe('createElement', () => {
    it('creates a DOM element', () => {
        const el = createElement();

        expect(el).toBeInstanceOf(HTMLDivElement);
    });

    it('creates a DOM element with tag', () => {
        const el = createElement({ tag: 'p' });

        expect(el).toBeInstanceOf(HTMLParagraphElement);
    });
});
