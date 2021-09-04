export default class Utils {
    public static async promise<T>(promise: Promise<T>): Promise<[Error | null, T | null]> {
        try {
            return [null, await promise]
        } catch (error) {
            return [error, null]
        }
    }
}
