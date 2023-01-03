
export const setPagination = (array:number[],pagination: number) => {
    for (let i = 1; i < pagination; i++) {
        array.push(i)
    }
     return array
}