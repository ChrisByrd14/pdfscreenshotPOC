const { checkString, futureDate, pastDate } = require("../helpers")

describe('checkString returns', () => {
    describe('true if', () => {
        test('string is not empty', () => {
            expect(checkString('not empty')).toBe(true);
        });

        test('string is within length parameters', () => {
            expect(checkString('Hello world', 10, 13)).toBe(true);
            expect(checkString('', 0, 13)).toBe(true);
        });
    });

    describe('false if', () => {
        test('string is empty', () => {
            expect(checkString('')).toBe(false);
            expect(checkString(null)).toBe(false);
        });

        test('string is not within length parameters', () => {
            expect(checkString('Hello world', 1, 5)).toBe(false);
            expect(checkString('Hello world', 15, 50)).toBe(false);
        });
    });
});

describe('futureDate returns', () => {
    test('true if date is in the future', () => {
        expect(futureDate('2099-01-01')).toBe(true);
    });

    test('false if date is in the past', () => {
        expect(futureDate('2000-01-01')).toBe(false);
    });

    test('false if invalid date provided', () => {
        expect(futureDate('this is not a date')).toBe(false);
    });
});

describe('pastDate returns', () => {
    test('true if date is in the past', () => {
        expect(pastDate('2001-01-01')).toBe(true);
    });

    test('false if date is in the future', () => {
        expect(pastDate('2099-01-01')).toBe(false);
    });

    test('false if invalid date provided', () => {
        expect(pastDate('this is not a date')).toBe(false);
    });
});
