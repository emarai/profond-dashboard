export const nsToms = (ns: number) => {
    return Math.floor(ns / 10**6)
}

export const numericToUSD = (numeric: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(numeric)
}