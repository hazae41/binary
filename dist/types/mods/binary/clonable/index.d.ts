/**
 * A clonable binary data type
 */
interface Clonable {
    /**
     * Deep clone this object
     */
    cloneOrThrow(): this;
}

export type { Clonable };
