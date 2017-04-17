export default angular.module('config', [])
  .constant('ENV', {
    env: 'local',
    imageUrl: 'http://lorempixel.com/',
    socketIOUrl: 'http://185.13.90.140:8081/',
  })
  .name;
