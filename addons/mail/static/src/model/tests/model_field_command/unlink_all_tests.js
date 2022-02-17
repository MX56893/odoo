/** @odoo-module **/

import { insertAndReplace, unlinkAll } from '@mail/model/model_field_command';
import {
    afterEach,
    beforeEach,
    start,
} from '@mail/utils/test_utils';

QUnit.module('mail', {}, function () {
QUnit.module('model', {}, function () {
QUnit.module('model_field_command', {}, function () {
QUnit.module('unlink_all_tests.js', {
    async beforeEach() {
        await beforeEach(this);
        this.start = async params => {
            const { env, widget } = await start(Object.assign({}, params, {
                data: this.data,
            }));
            this.env = env;
            this.widget = widget;
        };
    },
    afterEach() {
        afterEach(this);
    },
});

QUnit.test('unlinkAll: should set x2one field undefined', async function (assert) {
    assert.expect(2);
    await this.start();

    const contact = this.messaging.models['TestContact'].create({
        id: 10,
        address: insertAndReplace({ id: 20 }),
    });
    const address = this.messaging.models['TestAddress'].findFromIdentifyingData({ id: 20 });
    contact.update({ address: unlinkAll() });
    assert.strictEqual(
        contact.address,
        undefined,
        'clear: should set x2one field undefined'
    );
    assert.strictEqual(
        address.contact,
        undefined,
        'the inverse relation should be cleared as well'
    );
});

QUnit.test('unlinkAll: should set x2many field an empty array', async function (assert) {
    assert.expect(2);
    await this.start();

    const contact = this.messaging.models['TestContact'].create({
        id: 10,
        tasks: insertAndReplace({
            id: 20,
        }),
    });
    const task = this.messaging.models['TestTask'].findFromIdentifyingData({ id: 20 });
    contact.update({ tasks: unlinkAll() });
    assert.strictEqual(
        contact.tasks.length,
        0,
        'clear: should set x2many field empty array'
    );
    assert.strictEqual(
        task.responsible,
        undefined,
        'the inverse relation should be cleared as well'
    );
});

});
});
});
