import * as RepositoryRole from "./../repositories/repository.role";

export const getRole = async (name: string): Promise<number> => {
    const role = (await RepositoryRole.get({ nombre: name }))?.toJSON();
    return role.id;
};
