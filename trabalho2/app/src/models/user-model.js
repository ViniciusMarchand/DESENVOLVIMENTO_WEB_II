class User {
    constructor(id, name, password, cpf, role,  avatarUrl, createdAt) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.cpf = cpf;
        this.role = role;
        this.avatarUrl = avatarUrl;
        this.createdAt = createdAt ?? Date.now();
    }
}

export {
    User
}