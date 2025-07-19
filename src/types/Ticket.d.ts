interface ITicket {
    _id?: string;
    price?: number | string;
    events?: string;
    quantity?: number | string;
    name?: string;
    description?: string;
}

export { ITicket };