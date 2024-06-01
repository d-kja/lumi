export class Left<L, R> {
	public value: L;

	private constructor(value: L) {
		this.value = value;
	}

	isLeft(): this is Left<L, R> {
		return true;
	}

	isRight(): this is Right<L, R> {
		return false;
	}

	static new<L, R = unknown>(value: L): Left<L, R> {
		return new Left<L, R>(value);
	}
}

export class Right<L, R> {
	public value: R;

	private constructor(value: R) {
		this.value = value;
	}

	isLeft(): this is Left<L, R> {
		return false;
	}

	isRight(): this is Right<L, R> {
		return true;
	}

	static new<R, L = unknown>(value: R): Right<L, R> {
		return new Right<L, R>(value);
	}
}

export type Either<L, R> = Left<L, R> | Right<L, R>;
