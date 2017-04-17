export function run($notifications) {
  $notifications.start();
}

run.$inject = ['$notifications'];

export default run;
