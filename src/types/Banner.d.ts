interface IBanner {
    _id?: string,
    name?: string,
    description?: string,
    image?: string | FileList
    isShow?: boolean | string
}

export { IBanner };