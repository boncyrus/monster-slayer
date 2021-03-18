export const SkillTypes = Object.freeze({
    magical: {
        code: 'M',
        description: 'Magical',
    },
    physical: {
        code: 'P',
        description: 'Physical'
    },
    P() {
        return this.physical;
    },
    M() {
        return this.magical
    }
})