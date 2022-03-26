import { Account } from '../../core/Account';
import { TransactionRepository } from '../../core/TransactionRepository';
import { StatementPrinter } from '../../core/StatementPrinter';
import { Transaction } from '../../core/Transaction';
import { Clock } from '../../core/Clock';

describe('The account', () => {
	const clock = new Clock();
	const transactionRepository = new TransactionRepository(clock);
	const statementPrinter = new StatementPrinter();
	const account = new Account(transactionRepository, statementPrinter);
	const addDepositSpy = jest.spyOn(transactionRepository, 'addDeposit');
	const addWithdrawalSpy = jest.spyOn(transactionRepository, 'addWithdrawal');
	const printSpy = jest.spyOn(statementPrinter, 'print');

	it('stores a deposit transaction', () => {
		account.deposit(100);

		expect(addDepositSpy).toHaveBeenCalledWith(100);
	});

	it('stores a withdrawal transaction', () => {
		account.withdraw(100);

		expect(addWithdrawalSpy).toHaveBeenCalledWith(100);
	});

	it('print a statement', () => {
		const transactions: Transaction[] = [new Transaction('25/03/2022', 100), new Transaction('25/03/2022', 200)];
		transactionRepository.allTransactions = () => transactions;

		account.printStatement();
		expect(printSpy).toHaveBeenCalledWith(transactions);
	});
});
