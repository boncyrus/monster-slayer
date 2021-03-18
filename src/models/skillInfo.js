import { TargetTypes } from '../models/targetTypes';
import { SkillTypes } from '../models/skillTypes';

export class SkillInfo {
    _id = '';
    name = '';
    classId = 0;
    lvlReq = 0;
    damage = 0
    target = TargetTypes.enemy;
    cost = 0;
    type = SkillTypes.physical.code;

    constructor(data) {
        Object.assign(this, data);
    }
}