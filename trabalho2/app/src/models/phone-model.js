class Phone {
    constructor(id, number, userId) {
        this.id = id;
        this.email = email;
        this.userId = userId;
        // if (createdAt) {
        //     this.createdAt = createdAt;
        // } else {
        //     this.createdAt = Date.now();
        // }

        this.createdAt = createdAt ?? Date.now();
    }
}

export {
    Phone
}