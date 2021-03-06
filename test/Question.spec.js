import { mount } from 'vue-test-utils';
import expect from 'expect';
import Question from '../src/components/Question.vue';
import moxios from 'moxios';

describe('Question', () => {
    let wrapper;
    beforeEach(() => {
        moxios.install();

        wrapper = mount(Question, {
            propsData: {
                dataQuestion: {
                    title: 'The title',
                    body: 'The body',
                }
            }
        });
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it ('presents the title and the body', () => {
        see('The title');
        see('The body');
    });

    it ('can be edited', () => {
        expect(wrapper.contains('input[name=title]')).toBe(false);
        click('#edit');

        expect(wrapper.find('input[name=title]').element.value).toBe('The title');
        expect(wrapper.find('textarea[name=body]').element.value).toBe('The body');
    });

    it ('hides the edit button during edit mode', () => {
        click('#edit');
        expect(wrapper.contains('#edit')).toBe(false);
    });

    it ('updates the question after being edited', (done) => {
        click('#edit');

        type('Changed title', 'input[name=title]');
        type('Changed body', 'textarea[name=body]');

        moxios.stubRequest(/questions\/.+/, {
            status: 200,
            response: {
                title: 'Changed title',
                body: 'Changed body'
            }
        })

        click('#update');

        see('Changed title');
        see('Changed body');

        moxios.wait(() => {
            see('Your quesiton has been updated.');

            done();
        });
    });

    it ('can cancel out of edit mode', () => {
        click('#edit');

        type('Change title', 'input[name=title]');

        click('#cancel');

        see('The title');
    });

    // Helper Functions
    let see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;

        expect(wrap.html()).toContain(text);
    }

    let type = (text, selector) => {
        let node = wrapper.find(selector);
        node.element.value = text;
        node.trigger('input');
    }

    let click = selector => {
        wrapper.find(selector).trigger('click');
    }
});