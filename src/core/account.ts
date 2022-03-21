export interface Account{
  deposit(amount:number):void;
  withdraw(amount:number):void;
  printStatement():void;
}