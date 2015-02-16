var home = {
    name: "HOME",
    icon: "home icon",
    class: "item",
    href: "/",
    id: "home"
};

var send = {
    name: "SEND",
    icon: "chevron up icon",
    class: "item",
    href: "/send",
    id: "send"
};

var recieve = {
    name: "RECIEVE",
    icon: "chevron down icon",
    class: "item",
     href: "/receive",
    id: "receive"
};

var logout = {
    name: "SETTINGS",
     icon: "settings icon",
    class: "item",
    href: "/settings",
    id: "logout"
};

Template.menu.rendered = function(){
    $('#home').addClass('active');
    $('.menu .item').tab();

};

Template.menu.helpers({
  menuItems: function(){
    return [home, send, recieve, logout];
  }
});
