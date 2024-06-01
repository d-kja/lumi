import { EntityId } from "./value-objects/entity-id";

export class Entity<Props> extends EntityId {
	protected props: Props;

	protected constructor(props: Props, id?: EntityId) {
		super(id?.toString());
		this.props = props;
	}
}
