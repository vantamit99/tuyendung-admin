export function query(data: any) : string {
    if (typeof data == 'string' || typeof data == 'number') {
        return String(data);
    }
    let arr = [];
    for (let k in data) {
        arr.push(`${k}=${data[k]}`);
    }
    if (arr.length > 0) {
        let query = arr.join('&');
        return `?${query}`
    }
    return '';
}

export function merge(api_url: string, endpoint: string, query?: string) : string {
    return `${api_url}${endpoint}/${query}`;
}