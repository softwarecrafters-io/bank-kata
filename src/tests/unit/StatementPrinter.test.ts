import { Printer } from '../../core/Printer';
import { StatementPrinter } from '../../core/StatementPrinter';
import { Transaction } from '../../core/Transaction';

describe('The statement printer', () => {
	const printer = new Printer();
	const printLineSpy = jest.spyOn(printer, 'printLine');
	const statementPrinter = new StatementPrinter(printer);

	it('always prints the header', () => {
		statementPrinter.print([]);
		expect(printLineSpy).toHaveBeenCalledWith('Date | Amount | Balance');
	});

	it('prints transactions in reverse order', () => {
		const transactions = [deposit('10/01/2022', 1000), withdraw('13/01/2022', 500), deposit('14/01/2022', 2000)];

		statementPrinter.print(transactions);

		expect(printLineSpy).toHaveBeenCalledWith('Date | Amount | Balance');
		expect(printLineSpy).toHaveBeenCalledWith('14/01/2022 | 2000.00 | 2500.00');
		expect(printLineSpy).toHaveBeenCalledWith('13/01/2022 | -500.00 | 500.00');
		expect(printLineSpy).toHaveBeenCalledWith('10/01/2022 | 1000.00 | 1000.00');
	});

	function deposit(date: string, amount: number) {
		return new Transaction(date, amount);
	}

	function withdraw(date: string, amount: number) {
		return new Transaction(date, -amount);
	}
});
