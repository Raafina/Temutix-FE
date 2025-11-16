interface ITicket {
    _id?: string;
    price?: number | string;
    events?: string;
    quantity?: number | string;
    name?: string;
    description?: string;
}

interface ICart {
    events: string;
    ticket: string;
    quantity: number;
}

export { ITicket, ICart };