export interface GroupT {
    id: string,
    name: string,
}

export type NewGroupT = Omit<GroupT, "id">;