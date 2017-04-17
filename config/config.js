export default angular.module('config', [])
  .constant('ENV', {
    env: '@@env',
    imageUrl: '@@imageUrl',
    socketIOUrl: '@@socketIOUrl',
  })
  .name;
