export interface ContactT {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    isFavorite: boolean,
    address: string,
    image: string,
    number: string,
    company: string,
    groupId: string
}

export type NewContactT = Omit<ContactT,"id">;