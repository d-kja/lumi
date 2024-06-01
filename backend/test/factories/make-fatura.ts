import type { EntityId } from "@/core/entities/value-objects/entity-id";
import type { Right } from "@/core/errors/either";
import { Fatura, type FaturaType } from "@/domain/faturas/enterprise/entities/fatura.entity";
import { faker } from '@faker-js/faker'

export function makeFatura(props?: Partial<FaturaType>, id?: EntityId) {
  const date = faker.date.recent()
  return (
    Fatura.create({
      numeroCliente: props?.numeroCliente ?? faker.finance.accountNumber(3),
      contribilum: props?.contribilum ?? Number(faker.finance.amount()),
      mesReferencia: props?.mesReferencia ?? `${date.getMonth()}/${date.getFullYear()}`,
      energiaScee: {
        valor: props?.energiaScee?.valor ?? Number(faker.finance.amount()),
        quantidade: props?.energiaScee?.quantidade ?? faker.number?.int()
      },
      energiaEletrica: {
        valor: props?.energiaEletrica?.valor ?? Number(faker.finance.amount()),
        quantidade: props?.energiaEletrica?.quantidade ?? faker.number?.int()
      },
      energiaCompensada: {
        valor: props?.energiaCompensada?.valor ?? Number(faker.finance.amount()),
        quantidade: props?.energiaCompensada?.quantidade ?? faker.number?.int()
      }
    },
    id
    ) as unknown as Right<unknown, Fatura>
  ).value
}
