import { Injectable } from '@nestjs/common';

@Injectable()
export class WordFinderService {
  getUniqueWordsCount(input: Array<string>): Array<[string, number]> {
    const joined = input.join(' ');
    const cleaned = joined.match(/\b\w+\b/g).map((word) => word.toLowerCase());
    const counter = {} satisfies Record<string, number>;

    cleaned.forEach((word) => {
      if (!counter[word]) {
        counter[word] = 1;
      } else {
        counter[word]++;
      }
    });

    return Object.entries(counter);
  }

  getMostFrequentCharacterName(
    crawls: Array<string>,
    names: Array<string>,
  ): string | Array<string> {
    const joined = crawls.join(' ');

    let max = 0;
    let mostFrequents: Array<string> = [];

    names.forEach((name) => {
      const count = joined.split(name).length - 1;
      if (count > max) {
        max = count;
        mostFrequents = [name];
      } else if (count === max && count > 0) {
        mostFrequents.push(name);
      }
    });

    return mostFrequents.length === 1 ? mostFrequents[0] : mostFrequents;
  }
}
