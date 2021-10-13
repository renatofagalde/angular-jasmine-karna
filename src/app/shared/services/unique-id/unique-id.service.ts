import {Injectable} from "@angular/core";
import {v4 as uuidV4} from 'uuid';

@Injectable()
export class UniqueIdService {

  private numberOfGeneratedIds = 0;
  private validId = /^[A-Za-z]+[\w\-\:\.]*$/;

  public generateUniqueIdWithPrefix(prefix: string): string {
    //combinando os dois testes, (null e undefined) com a definição do que é um Id;
    if (!prefix || !this.validId.test(prefix)) {
      throw Error(`Prefix can not be empty`);
    }


    const uniqueId = this.generateUniqueId();
    this.numberOfGeneratedIds++;
    return `${prefix}-${uniqueId}`;
  }

  public getNumberOfGeneratedIds(): number {
    return this.numberOfGeneratedIds;
  }

  private generateUniqueId(): string {
    return uuidV4();
  }
}
