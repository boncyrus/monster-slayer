export class UpdateEquipmentRequest {
    weaponId = '';
    armorId = '';

    constructor(weaponId, armorId) {
        this.weaponId = weaponId;
        this.armorId = armorId;
    }
}