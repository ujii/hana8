package com.hana8.hello.oop;

public class OopBank {
	public static void main(String[] args) {
		Account[] accounts = {
			new FreeAccount(),
			new MontyhlyAccount(),
			new FundAccount()
		};

		FreeAccount free = (FreeAccount)accounts[0]; // 정적 생성이면 다운 캐스팅
		free.deposit(10000);
		free.transfer(accounts[1], 2000);
		free.transfer(accounts[2], 3000);

		// 동적 생성이면 아래처럼
		// accounts[0].deposit(10000);
		// if (accounts[0] instanceof FreeAccount free) {
		// 	free.transfer(accounts[1], 2000);
		// 	free.transfer(accounts[2], 3000);
		// }

		for (Account account : accounts) {
			if (account instanceof Withdrawable with) {
				with.withdraw(account.amount / 2);
			}

			System.out.println(account);
		}

		accounts[1].deposit(1000);
		accounts[1].deposit(1000);
		accounts[1].deposit(1000);
		((MontyhlyAccount)accounts[1]).mature(free);
	}
}
