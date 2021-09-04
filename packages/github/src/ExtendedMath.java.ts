export default class ExtendedMath {
    public static sum(numbers: number[]) {
        return numbers.reduce((sum, current) => sum + current, 0)
    }

    public static safeLog10(n: number) {
        return Math.log10(Math.max(n, 1))
    }
}
