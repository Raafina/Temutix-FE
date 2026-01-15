export type QueryParamValue =
    | string
    | number
    | boolean
    | undefined
    | null;

export const buildQueryParams = (
    params: Record<string, QueryParamValue>,
): string => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (
            value !== undefined &&
            value !== null &&
            value !== ""
        ) {
            searchParams.append(key, String(value));
        }
    });

    return searchParams.toString();
};
