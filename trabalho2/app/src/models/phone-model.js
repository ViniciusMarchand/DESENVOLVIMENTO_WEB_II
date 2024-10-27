class Phone {
    constructor(id, number, userId) {
        this.id = id;
        this.number = number;
        this.userId = userId;
        // if (createdAt) {
        //     this.createdAt = createdAt;
        // } else {
        //     this.createdAt = Date.now();
        // }

        this.createdAt = Date.now();
    }
}

export {
    Phone
}