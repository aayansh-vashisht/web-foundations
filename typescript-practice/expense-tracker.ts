import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

/* ==========================================================================
   1. DOMAIN TYPES
   ========================================================================== */

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD';

export type Category =
    | 'Housing'
    | 'Food'
    | 'Transportation'
    | 'Utilities'
    | 'Entertainment'
    | 'Healthcare'
    | 'Miscellaneous';

export interface Expense {
    id: string;
    amount: number;
    currency: Currency;
    category: Category;
    date: Date;
    description: string;
}

export interface FilterOptions {
    category?: Category;
    currency?: Currency;
    minAmount?: number;
    maxAmount?: number;
    startDate?: Date;
    endDate?: Date;
}

export type SortField = 'amount' | 'date' | 'category';
export type SortOrder = 'asc' | 'desc';

export interface SortingOptions {
    field: SortField;
    order: SortOrder;
}

export interface ResultSummary {
    totalCount: number;
    totalsByCurrency: Partial<Record<Currency, number>>;
    breakdownByCategory: Partial<Record<Category, number>>;
}

/* ==========================================================================
   2. CORE BUSINESS FUNCTIONS
   ========================================================================== */

export function filterExpenses(expenses: Expense[], filters: FilterOptions): Expense[] {
    return expenses.filter((item) => {
        if (filters.category && item.category !== filters.category) return false;
        if (filters.currency && item.currency !== filters.currency) return false;
        if (filters.minAmount !== undefined && item.amount < filters.minAmount) return false;
        if (filters.maxAmount !== undefined && item.amount > filters.maxAmount) return false;
        if (filters.startDate && item.date < filters.startDate) return false;
        if (filters.endDate && item.date > filters.endDate) return false;
        return true;
    });
}

export function sortExpenses(expenses: Expense[], options: SortingOptions): Expense[] {
    const { field, order } = options;
    const factor = order === 'asc' ? 1 : -1;

    return [...expenses].sort((a, b) => {
        switch (field) {
            case 'amount':
                return (a.amount - b.amount) * factor;
            case 'date':
                return (a.date.getTime() - b.date.getTime()) * factor;
            case 'category':
                return a.category.localeCompare(b.category) * factor;
            default:
                return 0;
        }
    });
}

export function groupExpenses<K extends 'category' | 'currency'>(
    expenses: Expense[],
    groupBy: K
): Record<string, Expense[]> {
    return expenses.reduce<Record<string, Expense[]>>((acc, item) => {
        const key = item[groupBy];
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {});
}

export function calculateTotals(expenses: Expense[]): ResultSummary {
    const totalsByCurrency: Partial<Record<Currency, number>> = {};
    const breakdownByCategory: Partial<Record<Category, number>> = {};

    for (const item of expenses) {
        totalsByCurrency[item.currency] = Number(
            ((totalsByCurrency[item.currency] ?? 0) + item.amount).toFixed(2)
        );
        breakdownByCategory[item.category] = Number(
            ((breakdownByCategory[item.category] ?? 0) + item.amount).toFixed(2)
        );
    }

    return {
        totalCount: expenses.length,
        totalsByCurrency,
        breakdownByCategory,
    };
}

/* ==========================================================================
   3. INTERACTIVE CLI RUNNER
   ========================================================================== */

const initialData: Expense[] = [
    { id: '1', amount: 42.5, currency: 'USD', category: 'Food', date: new Date('2026-03-01'), description: 'Lunch deli' },
    { id: '2', amount: 1250, currency: 'USD', category: 'Housing', date: new Date('2026-03-02'), description: 'Monthly rent' },
    { id: '3', amount: 65.0, currency: 'EUR', category: 'Transportation', date: new Date('2026-03-05'), description: 'Train pass' },
    { id: '4', amount: 18.0, currency: 'USD', category: 'Entertainment', date: new Date('2026-03-08'), description: 'Cinema ticket' },
];

function printTable(items: Expense[]) {
    if (items.length === 0) {
        console.log('\n  (No expenses match the criteria)\n');
        return;
    }
    console.log('\n' + '-'.repeat(70));
    console.log(
        ` ${'ID'.padEnd(4)} | ${'Description'.padEnd(20)} | ${'Amount'.padEnd(10)} | ${'Category'.padEnd(14)} | Date`
    );
    console.log('-'.repeat(70));
    for (const exp of items) {
        const dateStr = exp.date.toISOString().split('T')[0];
        const amountStr = `${exp.amount.toFixed(2)} ${exp.currency}`;
        console.log(
            ` ${exp.id.padEnd(4)} | ${exp.description.padEnd(20)} | ${amountStr.padEnd(10)} | ${exp.category.padEnd(14)} | ${dateStr}`
        );
    }
    console.log('-'.repeat(70) + '\n');
}

async function startCli() {
    const rl = readline.createInterface({ input, output });
    let expenses = [...initialData];

    while (true) {
        console.log('=== EXPENSE TRACKER CLI ===');
        console.log('1. View all expenses');
        console.log('2. Add an expense');
        console.log('3. Filter by category or currency');
        console.log('4. Sort expenses');
        console.log('5. View totals & category breakdown');
        console.log('6. Exit');

        const choice = (await rl.question('\nSelect an option (1-6): ')).trim();

        switch (choice) {
            case '1': {
                printTable(expenses);
                break;
            }
            case '2': {
                const desc = await rl.question('Description: ');
                const amountStr = await rl.question('Amount: ');
                const amount = parseFloat(amountStr);

                console.log('Currencies: USD, EUR, GBP, JPY, CAD');
                const curr = (await rl.question('Currency (default USD): ')).trim().toUpperCase() as Currency;
                const currency: Currency = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'].includes(curr) ? curr : 'USD';

                console.log('Categories: Housing, Food, Transportation, Utilities, Entertainment, Healthcare, Miscellaneous');
                const cat = (await rl.question('Category: ')).trim() as Category;

                expenses.push({
                    id: String(expenses.length + 1),
                    description: desc || 'Untitled',
                    amount: isNaN(amount) ? 0 : amount,
                    currency,
                    category: cat || 'Miscellaneous',
                    date: new Date(),
                });
                console.log('Expense added successfully!\n');
                break;
            }
            case '3': {
                const cat = (await rl.question('Filter by Category (leave blank to skip): ')).trim() as Category;
                const curr = (await rl.question('Filter by Currency (leave blank to skip): ')).trim().toUpperCase() as Currency;

                const filtered = filterExpenses(expenses, {
                    category: cat ? cat : undefined,
                    currency: curr ? curr : undefined,
                });
                printTable(filtered);
                break;
            }
            case '4': {
                console.log('Sort fields: amount, date, category');
                const field = (await rl.question('Choose field: ')).trim() as SortField;
                const order = (await rl.question('Order (asc / desc): ')).trim() as SortOrder;

                const sorted = sortExpenses(expenses, {
                    field: ['amount', 'date', 'category'].includes(field) ? field : 'date',
                    order: order === 'desc' ? 'desc' : 'asc',
                });
                printTable(sorted);
                break;
            }
            case '5': {
                const summary = calculateTotals(expenses);
                console.log('\n--- FINANCIAL SUMMARY ---');
                console.log(`Total count: ${summary.totalCount}`);
                console.log('Totals by Currency:');
                for (const [curr, total] of Object.entries(summary.totalsByCurrency)) {
                    console.log(`  - ${curr}: ${total}`);
                }
                console.log('Breakdown by Category:');
                for (const [cat, total] of Object.entries(summary.breakdownByCategory)) {
                    console.log(`  - ${cat}: ${total}`);
                }
                console.log('');
                break;
            }
            case '6': {
                console.log('Goodbye!');
                rl.close();
                return;
            }
            default: {
                console.log('Invalid option, try again.\n');
            }
        }
    }
}

startCli();