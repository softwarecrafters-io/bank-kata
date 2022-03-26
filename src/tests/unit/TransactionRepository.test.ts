import { Transaction } from '../../core/Transaction';
import { TransactionRepository } from '../../core/TransactionRepository';
import { Clock } from '../../core/Clock';

describe('The transaction repository', () => {
	const today = '25/03/2022';
	const clock = new Clock();
	const transactionRepository = new TransactionRepository(clock);

	it('creates and stores a deposit transaction', () => {
		clock.todayAsString = () => today;
		transactionRepository.addDeposit(100);

		const transactions = transactionRepository.allTransactions();

		expect(transactions.length).toBe(1);
		expect(transactions[0]).toEqual(transaction(today, 100));
	});

	it('creates and stores a withdrawal transaction', () => {
		clock.todayAsString = () => today;
		transactionRepository.addWithdrawal(100);

		const transactions = transactionRepository.allTransactions();

		expect(transactions.length).toBe(1);
		expect(transactions[0]).toEqual(transaction(today, -100));
	});

	function transaction(date: string, amount: number) {
		return new Transaction(date, amount);
	}
});
