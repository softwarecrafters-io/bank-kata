import { Account } from '../../core/Account';
import { Printer } from '../../core/Printer';
import { TransactionRepository } from '../../core/TransactionRepository';
import { StatementPrinter } from '../../core/StatementPrinter';
import { Clock } from '../../core/Clock';

describe('The print statement', () => {
	const printer = new Printer();
	const printLineSpy = jest.spyOn(printer, 'printLine');
	const clock = new Clock();
	clock.todayAsString = jest
		.fn()
		.mockReturnValueOnce('10/01/2022')
		.mockReturnValueOnce('13/01/2022')
		.mockReturnValueOnce('14/01/2022');
	const transactionRepository = new TransactionRepository(clock);
	const statementPrinter = new StatementPrinter(printer);
	const account: Account = new Account(transactionRepository, statementPrinter);

	it('contains all transactions', () => {
		account.deposit(1000);
		account.withdraw(500);
		account.deposit(2000);
		account.printStatement();

		expect(printLineSpy).toHaveBeenCalledWith('Date | Amount | Balance');
		expect(printLineSpy).toHaveBeenCalledWith('14/01/2022 | 2000.00 | 2500.00');
		expect(printLineSpy).toHaveBeenCalledWith('13/01/2022 | -500.00 | 500.00');
		expect(printLineSpy).toHaveBeenCalledWith('10/01/2022 | 1000.00 | 1000.00');
	});
});
