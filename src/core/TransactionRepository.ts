import { Transaction } from './Transaction';
import { Clock } from './Clock';

export class TransactionRepository {
	private transactions: Transaction[] = [];
	constructor(private clock: Clock) {}

	allTransactions(): ReadonlyArray<Transaction> {
		return this.transactions;
	}

	addDeposit(amount: number) {
		const transaction = new Transaction(this.clock.todayAsString(), amount);
		this.transactions.push(transaction);
	}

	addWithdrawal(amount: number) {
		const transaction = new Transaction(this.clock.todayAsString(), -amount);
		this.transactions.push(transaction);
	}
}
