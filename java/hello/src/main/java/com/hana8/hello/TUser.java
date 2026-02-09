package com.hana8.hello;

import java.util.Objects;

public class TUser {
	private final int id;
	private final String name;

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null || getClass() != obj.getClass()) {
			return false;
		}
		TUser tUser = (TUser)obj;
		return id == tUser.id && Objects.equals(name, tUser.name);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name);
	}

	public TUser(int id, String name) {
		this.id = id;
		this.name = name;
	}

}
