import { generate } from 'shortid';

export default class BattleLog {
    constructor(text) {
        this.id = generate();
        this.text = text;
    }
}