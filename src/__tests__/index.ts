import nehtml2canvas from '../index';

import {DocumentCloner} from '../dom/document-cloner';

jest.mock('../core/logger');
jest.mock('../css/layout/bounds');
jest.mock('../dom/document-cloner');
jest.mock('../dom/node-parser', () => {
    return {
        isBodyElement: () => false,
        isHTMLElement: () => false,
        parseTree: jest.fn().mockImplementation(() => {
            return {styles: {}};
        })
    };
});

jest.mock('../render/stacking-context');
jest.mock('../render/canvas/canvas-renderer');

describe('nehtml2canvas', () => {
    const element = {
        ownerDocument: {
            defaultView: {
                pageXOffset: 12,
                pageYOffset: 34
            }
        }
    } as HTMLElement;

    it('should render with an element', async () => {
        DocumentCloner.destroy = jest.fn().mockReturnValue(true);
        await nehtml2canvas(element);
        expect(DocumentCloner.destroy).toBeCalled();
    });

    it('should have transparent background with backgroundColor: null', async () => {
        await nehtml2canvas(element, {backgroundColor: null});
    });

    it('should use existing canvas when given as option', async () => {
        const canvas = {} as HTMLCanvasElement;
        await nehtml2canvas(element, {canvas});
    });

    it('should not remove cloned window when removeContainer: false', async () => {
        DocumentCloner.destroy = jest.fn();
        await nehtml2canvas(element, {removeContainer: false});
        expect(DocumentCloner.destroy).not.toBeCalled();
    });
});
