package com.hana8.hello;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

// RetentionPolicy.RUNTIME해야 런타임 중에도 어노테이션으로 존재
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.PARAMETER})
public @interface Min {
	int value();

	String msg() default "%d 보다는 커야합니다!";
}
