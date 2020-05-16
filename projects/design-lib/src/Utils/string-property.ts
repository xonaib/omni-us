

function isNullOrEmpty(str: string): boolean {
    return (str == null) || (str.length === 0);
}

export const STRING = {
    isNullOrEmpty,
};