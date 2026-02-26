package com.hana8.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import com.hana8.demo.controller.GreetingController;
import com.hana8.demo.controller.HelloController;
import com.hana8.demo.service.EagerCallService;
import com.hana8.demo.service.HelloService;
import com.hana8.demo.service.HelpCallService;
import com.hana8.demo.service.LazyCallService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext ctx = SpringApplication.run(DemoApplication.class, args);

		// 스프링 컨테이너에는 HelloContainer가 등록되어 있음
		// 따라서 getBean해서 정보를 가져올 수 있음
		HelloController helloBean = ctx.getBean(HelloController.class);
		log.debug("hello {}", helloBean.hello());

		// 에러남. 왜냐하면 스프링이 bean을 모르기 때문에 검증할 수 없다고 에러남
		// 따라서 @Component와 같은 어노테이션을 쓰면 빈으로 등록됨
		HelloService helloService = ctx.getBean(HelloService.class);
		log.debug("helloService = {}", helloService.sayHello());

		// 이름으로 컴포넌트를 등록할 때는 무조건 타입 캐스팅
		HelloService helloService2 = (HelloService)ctx.getBean("hello-service");
		log.debug("helloService2 = {}", helloService2.sayHello());

		// GreetingService greetingService = ctx.getBean(GreetingService.class);
		// log.debug("greetingService = {}", greetingService.call());
		GreetingController greetingService = ctx.getBean(GreetingController.class);
		log.debug("greetingService = {}", greetingService.call());

		HelpCallService help = ctx.getBean(HelpCallService.class);
		log.debug("help = {}", help.call());

		System.out.println(
			"ctx.getBean(EagerCallService.class).hashCode() = " + ctx.getBean(EagerCallService.class).hashCode());
		System.out.println(
			"ctx.getBean(EagerCallService.class).hashCode() = " + ctx.getBean(EagerCallService.class).hashCode());
		System.out.println(
			"ctx.getBean(EagerCallService.class).hashCode() = " + ctx.getBean(EagerCallService.class).hashCode());

		LazyCallService lazy = ctx.getBean(LazyCallService.class);
		log.debug("lazy = {}", lazy.call());

	}

}
