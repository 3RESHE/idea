import fs from 'fs';
import { describe, it } from 'mocha';
import { expect, use } from 'chai';
import deepEqualInAnyOrder from 'deep-equal-in-any-order';
import UseTree from '../src/trees/UseTree';

use(deepEqualInAnyOrder);

describe('Use Tree', () => {
  it('Should parse Use', async () => {
    const actual = UseTree.parse(fs.readFileSync(`${__dirname}/fixtures/use.idea`, 'utf8'));
    const expected = JSON.parse(fs.readFileSync(`${__dirname}/fixtures/use.json`, 'utf8'));
    //console.log(JSON.stringify(actual, null, 2));
    expect(actual).to.deep.equalInAnyOrder(expected);
  });

  // Line 32
  it('Should throw an error when the input code is an empty string', () => {
    expect(() => {
      const lexerMock = {
        expect: (tokenType: string) => { throw new Error('Unexpected end of input'); },
        load: () => {}
      };
      const useTree = new UseTree();
      (useTree as any)._lexer = lexerMock; 
      useTree.parse('');
    }).to.throw(Error, 'Unexpected end of input');
  });



});
