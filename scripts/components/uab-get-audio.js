var uabGetAudio = {
  template: ' \
    <a md-button ng-if="$mdMedia(\'gt-xs\')" target="blank" href="{{$ctrl.href}}" download="{{ $ctrl.href }}"> \
    <a md-button class="md-icon-button" ng-if="!$mdMedia(\'gt-xs\')" target="blank" href="{{$ctrl.href}}" download="{{ $ctrl.href }}"> \
      <md-icon md-font-icon="icon-get_app" class="icon-24"></md-icon> \
      <md-tooltip md-direction="top">Baixar Audio Aula</md-tooltip> \
    </a> \
  ',
  bindings: {
    href: "@"
  }
}

angular.module('application').component('uabGetAudio', uabGetAudio)
