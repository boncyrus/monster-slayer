import Skill from '../models/skill';
import ActionTypes from '../models/actionTypes';
import CharacterClassTypes from '../models/characterClassTypes';
import CharacterAction from '../models/characterAction';

const defaultActions = [
    new CharacterAction("Attack", ActionTypes.damage, 10),
    new CharacterAction("Focus", ActionTypes.heal, 20),
];

const skillSet = [
    // Saber
    new Skill("Back Stab", ActionTypes.damage, 20, 20, CharacterClassTypes.saber),
    new Skill("Raid", ActionTypes.damage, 30, 30, CharacterClassTypes.saber),
    new Skill("Tunnel Drive", ActionTypes.damage, 40, 40, CharacterClassTypes.saber),

    // Archer
    new Skill("Double Strafe", ActionTypes.damage, 20, 20, CharacterClassTypes.archer),
    new Skill("Arrow Shower", ActionTypes.damage, 30, 30, CharacterClassTypes.archer),
    new Skill("Charge Arrow", ActionTypes.damage, 40, 40, CharacterClassTypes.archer),

    // Lancer
    new Skill("Bash", ActionTypes.damage, 20, 20, CharacterClassTypes.lancer),
    new Skill("Magnum Break", ActionTypes.damage, 30, 30, CharacterClassTypes.lancer),
    new Skill("Bowling Bash", ActionTypes.damage, 40, 40, CharacterClassTypes.lancer),

    // Berserker
    new Skill("Fervor", ActionTypes.damage, 20, 20, CharacterClassTypes.berserker),
    new Skill("Grimtooth", ActionTypes.damage, 30, 30, CharacterClassTypes.berserker),
    new Skill("Sonic Blow", ActionTypes.damage, 40, 40, CharacterClassTypes.berserker),

    // Caster
    new Skill("Fire Pillar", ActionTypes.damage, 20, 20, CharacterClassTypes.caster),
    new Skill("Meteor Storm", ActionTypes.damage, 30, 30, CharacterClassTypes.caster),
    new Skill("Jupitel Thunder", ActionTypes.damage, 40, 40, CharacterClassTypes.caster)
];


export class MovesService {
    createMoves(classTypeValue) {
        return {
            actions: [...defaultActions],
            skills: [...skillSet.filter(x => x.classType.value === classTypeValue)]
        };
    }
}