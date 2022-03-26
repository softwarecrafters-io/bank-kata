import { Printer } from './Printer';
import { Transaction } from './Transaction';

export class StatementPrinter {
	private readonly header = 'Date | Amount | Balance';

	constructor(private printer: Printer) {}

	print(transactions: ReadonlyArray<Transaction>) {
		this.printer.printLine(this.header);
		this.printStatementLines(transactions);
	}

	private printStatementLines(transactions: ReadonlyArray<Transaction>) {
		transactions
			.map(this.fromTransactionToStatementLine())
			.reverse()
			.forEach((line) => this.printer.printLine(line));
	}

	private fromTransactionToStatementLine() {
		let runningBalance = 0;
		return (transaction) => this.statementLine(transaction, (runningBalance += transaction.amount));
	}

	private statementLine(transaction: Transaction, runningBalance: number) {
		const formattedAmount = transaction.amount.toFixed(2);
		const formattedBalance = runningBalance.toFixed(2);
		return `${transaction.date} | ${formattedAmount} | ${formattedBalance}`;
	}
}
