/*
describe('Nome do que será testado', () => {
  it('should be the first test', () => {

  });
})
*/

import {UniqueIdService} from "./unique-id.service";

describe(UniqueIdService.name, () => {

  let service = null;
  beforeEach(() => {
    service = new UniqueIdService();
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
    should generate id when called with prefix`, () => {

    const uniqueId = service.generateUniqueIdWithPrefix('app');
    expect(uniqueId.startsWith('app-')).toBeTrue();
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
    should not generate duplicate IDs when called multiple times`, () => {

    // const firstId = service.generateUniqueIdWithPrefix('app');
    // const secondId = service.generateUniqueIdWithPrefix('app');

    const ids = new Set(); //set ñ permite valores duplicados
    for (let i = 0; i < 50000; i++) {
      ids.add(service.generateUniqueIdWithPrefix('app'));
    }
    expect(ids.size).toBe(50000);

  });

  it(`#${UniqueIdService.prototype.getNumberOfGeneratedIds.name}
    should return the number of unique ids`, function () {

    service.generateUniqueIdWithPrefix('app');
    service.generateUniqueIdWithPrefix('app');

    expect(service.getNumberOfGeneratedIds()).toBe(2);

  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
    should throw when called with empty`, () => {

    const emptyValues = [null, undefined, '','0','1'];
    //const emptyValues = [null, undefined, '','0','1','app']; para ver o erro
    emptyValues.forEach(emptyValue => {
      //para testar exceção deve ser feito dentro de um método
      expect(() => service.generateUniqueIdWithPrefix(emptyValue))
        .withContext(`Empty value: ${emptyValue}`)
        .toThrow()
    });

  });

})
