import 'burdy/src/types/burdy';

export {};

/**
 * Here you can extend global hooks and keep your project organised and clean.
 *
 * IActions - used on backend, they fire all at once and their return type doesn't matter
 * IFilters - used on backend, they fire one by one based on priority and their return matters
 * IFiltersSync - used on frontend, they fire one by one based on priority and their return matters
 *
 * Keep in mind that objects inside of hooks should NOT be mutated.
 */
declare global {
  namespace Burdy {
    interface IActions {

    }

    interface IFilters {

    }

    interface IFiltersSync {

    }
  }
}
