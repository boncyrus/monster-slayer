export default class Account {

    fullName;
    email;
    username;
    password;
    characterName;
    classType;

    constructor(data) {
        Object.assign(this, data);
    }
}