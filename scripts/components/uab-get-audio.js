var uabGetAudio = {
  template: ' \
    <a md-button ng-show="$root.$mdMedia(\'gt-sm\')" target="blank" href="{{$ctrl.href}}" download="{{ $ctrl.href }}"> \
      Baixar Audio \
    </a>\
    <a md-button class="md-icon-button" ng-if="$root.$mdMedia(\'xs\')" target="blank" href="{{$ctrl.href}}" download="{{ $ctrl.href }}"> \
      <md-icon md-font-icon="icon-get_app" class="icon-24"></md-icon> \
      <md-tooltip md-direction="top">Baixar Audio Aula</md-tooltip> \
    </a> \
  ',
  bindings: {
    href: "@"
  }
}

angular.module('application').component('uabGetAudio', uabGetAudio)
