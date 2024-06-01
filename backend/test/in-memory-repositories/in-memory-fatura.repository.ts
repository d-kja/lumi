import type { EntityId } from "@/core/entities/value-objects/entity-id";
import type { FaturaFindManyRequest, FaturaRepository } from "@/domain/faturas/application/repositories/fatura.repository";
import type { Fatura } from "@/domain/faturas/enterprise/entities/fatura.entity";

export class InMemoryFaturaRepository implements FaturaRepository {
  database: Fatura[] = []

  async create(data: Fatura): Promise<Fatura>  {
    this.database.push(data)
    return data
  }

  async update(data: Fatura): Promise<void>  {
    const idx = this.database.findIndex(
      item => item.id.equal(data.id)
    )

    this.database[idx] = data
  }

  async deleteById(id: EntityId): Promise<void>  {
    const idx = this.database.findIndex(
      item => item.id.equal(id)
    )

    this.database.splice(idx, 1)
  }

  async findById(id: EntityId): Promise<Fatura | null>  {
    const data = this.database.find(
      item => item.id.equal(id)
    )

    if (!data) return null

    return data
  }

  async findMany(params?: FaturaFindManyRequest): Promise<Fatura[]> {
    const data = this.database.filter(item => item.numeroCliente.startsWith(params?.numeroCliente ?? ''))
    return data
  }
}
