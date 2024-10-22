class User {
    constructor(name, password, cpf, role,  avatarUrl, createdAt) {
        this.name = name;
        this.password = password;
        this.cpf = cpf;
        this.role = role;
        this.avatarUrl = avatarUrl;
        // if (createdAt) {
        //     this.createdAt = createdAt;
        // } else {
        //     this.createdAt = Date.now();
        // }

        this.createdAt = createdAt ?? Date.now();
    }
}

export {
    User
}