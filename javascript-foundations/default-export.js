// models/User.js

export default class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    getDetails() {
        return `${this.name} (${this.email})`;
    }
}