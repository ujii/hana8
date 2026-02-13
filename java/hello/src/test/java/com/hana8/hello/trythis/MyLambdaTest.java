package com.hana8.hello.trythis;

import static com.hana8.hello.trythis.MyLambda.filter;
import static com.hana8.hello.trythis.MyLambda.map;
import static com.hana8.hello.trythis.MyLambda.*;
import static org.assertj.core.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

class MyLambdaTest {

	private List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9);

	@Test
	void filterTest() {
		List<Integer> list = numbers.stream().filter(i -> i % 2 == 0).toList();
		assertThat(list).isEqualTo(List.of(2, 4, 6, 8));

		MyPredicate<Integer> mp = i -> i % 2 == 0;
		List<Integer> evens = filter(numbers, mp);
		assertThat(evens).isEqualTo(list);
	}

	@Test
	void mapTest() {
		List<Integer> squares = map(numbers, value -> value * value);
		assertThat(squares).isEqualTo(numbers.stream().map(i -> i * i).toList());
	}

	@Test
	void findTest() {
		Integer bigger3 = find(numbers, value -> value > 3);
		assertThat(bigger3).isEqualTo(numbers.stream().filter(i -> i > 3).findFirst().orElse(-1));
	}

	@Test
	void reduceTest() {
		int sum1 = reducer(numbers, 100, Integer::sum);
		int sum11 = reducer(numbers, 1, (a, b) -> a * b);
		int sum2 = reducer(numbers, 0, (a, b) -> a * b);
		int sum3 = reducer(numbers, 10, (a, b) -> a * b);

		assertThat(sum1).isEqualTo(145);
		assertThat(sum11).isEqualTo(numbers.stream().reduce((a, b) -> a * b).orElse(-1));
		assertThat(sum11).isEqualTo(numbers.stream().reduce(1, (a, b) -> a * b));
		assertThat(sum2).isEqualTo(numbers.stream().reduce(0, (a, b) -> a * b));
		assertThat(sum3).isEqualTo(3628800);
		assertThat(sum3).isEqualTo(numbers.stream().reduce(10, (a, b) -> a * b));

		System.out.println("numbers.stream().reduce(10, (a, b) -> a * b) = " + numbers.stream()
			.reduce(10, (a, b) -> a * b));
	}
}
