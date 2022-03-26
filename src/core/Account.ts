import { TransactionRepository } from './TransactionRepository';
import { StatementPrinter } from './StatementPrinter';

export class Account {
	constructor(private transactionRepository: TransactionRepository, private statementPrinter: StatementPrinter) {}
	deposit(amount: number): void {
		this.transactionRepository.addDeposit(amount);
	}

	withdraw(amount: number): void {
		this.transactionRepository.addWithdrawal(amount);
	}

	printStatement(): void {
		const transactions = this.transactionRepository.allTransactions();
		this.statementPrinter.print(transactions);
	}
}
