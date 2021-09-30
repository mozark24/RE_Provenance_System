import { Handler } from './api';
/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
export default function mitt(all?: any): {
    /**
     * Register an event handler for the given type.
     *
     * @param  {String} type	Type of event to listen for
     * @param  {Function} handler Function to call in response to given event
     * @memberOf mitt
     */
    on(type: string, handler: Handler): void;
    /**
     * Remove an event handler for the given type.
     *
     * @param  {String} type	Type of event to unregister `handler` from
     * @param  {Function} handler Handler function to remove
     * @memberOf mitt
     */
    off(type: string, handler: Handler): void;
    /**
     * Invoke all handlers for the given type.
     *
     * @param {String} type  The event type to invoke
     * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
     * @memberOf mitt
     */
    emit(type: string, evt: any): void;
};
