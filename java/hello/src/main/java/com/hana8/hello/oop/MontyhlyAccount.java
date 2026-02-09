package com.hana8.hello.oop;

public class MontyhlyAccount extends Account implements Transferable {
	public MontyhlyAccount() {
		super("정기적금");
	}

	@Override
	public void transfer(Account toAccount, double amount) {
		toAccount.deposit(amount);
		this.amount -= amount;
	}

	public void mature(Account freeAccount) {
		this.transfer(freeAccount, this.amount);
		this.close();
	}
}
