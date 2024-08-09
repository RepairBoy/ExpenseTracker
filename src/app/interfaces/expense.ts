export interface Expense {

    amount: number;
    createdAt: string;
    description: string;
    id: number;
    name: string;
      
}

export interface EditExpense {
    amount: number;
    description: string;
    name: string;
}
