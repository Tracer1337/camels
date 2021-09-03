export default class ExtendedMath {
    public static sum(numbers: number[]) {
        return numbers.reduce((sum, current) => sum + current, 0)
    }
}
