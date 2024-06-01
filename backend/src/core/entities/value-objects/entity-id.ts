import { randomUUID } from "node:crypto";

export class EntityId {
	private _id: string;

	protected constructor(id?: string) {
		this._id = id ?? randomUUID();
	}

	get id() {
		return this;
	}

	toString() {
		return this._id;
	}

	equal(data: EntityId) {
		if (!data || data.toString() !== this._id) return false;

		return data.toString() === this._id;
	}

	static new(id: string) {
		return new EntityId(id);
	}
}
