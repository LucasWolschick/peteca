const listAllUsers = async() => {
    const Users = await this.findAll();
    return Users
};
