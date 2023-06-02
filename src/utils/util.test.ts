import { sampleUserData } from './sample-data';

jest.setTimeout(30000);

describe('array test', () => {
  describe('Utility', () => {
    test.each([
      { name: 'name', expectedName: 'name' },
      { name: 'name2', expectedName: 'name2' },
    ])('parseNumber() : %p', ({ name, expectedName }) => {
      expect(name).toEqual(expectedName);
      console.log(sampleUserData);
    });
  });
});
