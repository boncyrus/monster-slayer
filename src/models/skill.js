import { SkillTypes } from '../models/skillTypes';

export default class Skill {

    _id = '';
    name = '';
    classId = 0;
    damage = 0;
    target = '';
    cost = 0;
    type = SkillTypes.magical;

    constructor(data) {
        Object.assign(this, data);
    }
}
