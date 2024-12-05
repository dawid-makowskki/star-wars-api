import { Test, TestingModule } from '@nestjs/testing';
import { WordFinderService } from './word-finder.service';

const getUniqueWordsCountInputs = {
  uniquePairsTest: [
    `
  Some natural text, im im im using characters such as as dots, commas and dashes (some-word)...
  Also include multiline.
  `,
    `Second item in array, it should work as just fine some`,
  ],
  countingTest: [`A a a a a a a a a a, some some some some`],
};

const getMostFrequentCharacterNameInputs = {
  returnStringTest: [
    `
      Some basic text with Anakin Skywalker mentioned to test if it returns string.
    `,
    `Anakin Skywalker mentioned again but also Leia Organa once.`,
  ],
  returnArrayTest: [
    `For Anakin Skywalker and Leia Organa, it should return both Anakin Skywalker and Leia Organa.`,
  ],
};

const names = ['Anakin Skywalker', 'Leia Organa', 'Darth Vader', 'Random Name'];

describe('WordFinderService', () => {
  let wordFinderService: WordFinderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordFinderService],
    }).compile();

    wordFinderService = module.get<WordFinderService>(WordFinderService);
  });

  describe('getUniqueWordsCount', () => {
    it('should return pairs of words and numbers', () => {
      const result = wordFinderService.getUniqueWordsCount(
        getUniqueWordsCountInputs.uniquePairsTest,
      );
      expect(result.every((entry) => entry.length === 2)).toBeTruthy();
    });

    it('should contain unique words only', () => {
      const result = wordFinderService.getUniqueWordsCount(
        getUniqueWordsCountInputs.uniquePairsTest,
      );
      const keys = result.map((entry) => entry[0]);
      expect(keys.length === [...new Set(keys)].length).toBeTruthy();
    });

    it('should correctly count unique words', () => {
      const result = wordFinderService.getUniqueWordsCount(
        getUniqueWordsCountInputs.countingTest,
      );
      const values = result.map((entry) => entry[1]);

      const expectedValues = [10, 4];

      expect(
        values.every((val, index) => val === expectedValues[index]),
      ).toBeTruthy();
    });
  });

  describe('getMostFrequentCharacterName', () => {
    it('should return string', () => {
      const result = wordFinderService.getMostFrequentCharacterName(
        getMostFrequentCharacterNameInputs.returnStringTest,
        names,
      );

      expect(typeof result === 'string').toBeTruthy();
    });

    it('should return array', () => {
      const result = wordFinderService.getMostFrequentCharacterName(
        getMostFrequentCharacterNameInputs.returnArrayTest,
        names,
      );

      expect(Array.isArray(result)).toBeTruthy();
    });
  });
});
