export type TPaginationFunc = (plusNum: number) => number;
export type TPaginationReturn = { skip: TPaginationFunc; first: TPaginationFunc };
