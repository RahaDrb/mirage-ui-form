export const checkEmptyString = (string?: string | null): boolean => {
    return string?.length === 0
};

export const toNumber = (value: any): number => {
    if (typeof value === 'number') {
        return value;
    }
    if (typeof value === 'string' && !isNaN(Number(value))) {
        return parseInt(value, 10);
    }
    return NaN;
};