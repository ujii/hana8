package com.hana8.hello;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class StreamPlay {
	public static void main(String[] args) {
		List<String> list = Arrays.asList("JS", "TS", "Java", "JS");
		Stream<String> stream = list.stream();
		List<String> list1 = list.stream().toList();
		// List<String> collect = list.stream().collect(Collectors.toList());
		// list.stream().toList();

		String collect = list.stream().collect(Collectors.joining(", "));
		String collect2 = String.join(", ", list);
		System.out.println("collect2 = " + collect2);
		list.forEach(System.out::print);
		// list.stream().forEach(System.out::println);
		System.out.println("list.stream().collect(Collectors.groupingBy(String::length)) = " + list.stream()
			.collect(Collectors.groupingBy(String::length)));

		long count = list.stream().map(String::length).count();
		System.out.println("count = " + count);
		// long count = list.stream().map(String::length).sum();
		Stream<Integer> stream1 = list.stream()
			.map(String::length); // stream1은 Stream타입. stream1에는 sum이 없음 sum은 IntStream, DoubleStrema, LongStream에 존재
		IntStream intStream = list.stream().mapToInt(String::length); // IntStream 타입
		// intStream.sum();

		System.out.println(
			"list.stream().mapToInt(String::length).sum() = " + list.stream().mapToInt(String::length).sum());

		System.out.println(
			"Arrays.toString(IntStream.range(1, 10).toArray()) = " + Arrays.toString(IntStream.range(1, 10).toArray()));
		IntStream intStream1 = IntStream.rangeClosed(1, 10);
		System.out.println("intStream1.sum() = " + intStream1.sum());

		Map<String, Integer> map1 = list.stream()
			.distinct()
			.collect(Collectors.toMap(s -> s, String::length)); // toMap은 중복 허용x 따라서 distinct하거나 아래처럼 merge 규칙 정해야함
		// Map<String, Integer> map1 =
		// 	list.stream()
		// 		.collect(Collectors.toMap(
		// 			s -> s,
		// 			String::length,
		// 			(v1, v2) -> v1   // 중복 시 기존 값 유지
		// 		));
		System.out.println("map1 = " + map1);

		Collections.swap(list, 1, 2);
		System.out.println("list = " + list);

		Function<String, Integer> length = String::length;
		Consumer<String> print = System.out::println;
		
	}

}
