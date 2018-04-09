var uabTabsVerticalCtrl = function($element){
  var self = this

  $($element)
    .find('.uab-tabs-pagination .md-button').on('click', angular.bind(self, onClickItem, $element))

  return self;
};

uabTabsVerticalCtrl.$inject = ['$element'];

var uabTabsVertical = {
  controller: uabTabsVerticalCtrl  
};

angular.module('application').component('uabTabsVertical', uabTabsVertical);

// @private
function onClickItem(element, e){
  e.preventDefault()

  var tabId = $(e.target).parent().attr('target')

  // unmark all itens
  $(e.target).closest('ul').find('li').removeClass('active');
  $(e.target).closest('ul').find('li .md-primary').removeClass('md-primary');
  // mark current item
  $(e.target).addClass('md-primary');
  $(e.target).parent().addClass('active');

  activeTab(element, tabId);
};

function activeTab(element, tabId){
  $(element).find('.uab-tabs-body md-content').removeClass('active');

  var tab = $(element).find('.uab-tabs-body').find(tabId)

  $(tab).addClass('active');
  $(tab).scrollTop(0);
};