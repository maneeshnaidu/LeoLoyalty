const BACKGROUND_TASK_IDENTIFIER = 'fetch-points-task';
const BACKGROUND_TASK_MINIMUM_INTERVAL = 15 * 60 * 1000; // 15 minutes in milliseconds
const BACKGROUND_TASK_HISTORY_KEY = '@points_history';
const MAX_HISTORY_ITEMS = 5; // Maximum number of history items to keep