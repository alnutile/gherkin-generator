function EventsConverter() {

}

EventsConverter.prototype.stepType = function(userEvent)
{
   console.log(userEvent);
   var converted = "not found";

   this.userEvent = userEvent;

   if(this.userEvent.type == 'click')
   {
     if(this.userEvent.data.target.nodeName == "BUTTON")
     {
       var converted = EventsConverter.prototype.button(this.userEvent);
     }
     else if (this.userEvent.data.target.nodeName == "INPUT") {
       var converted = EventsConverter.prototype.input(this.userEvent);
     }

   }

   return converted;
}

EventsConverter.prototype.button = function(userEvent)
{
  this.userEvent = userEvent;

  var label =  EventsConverter.prototype.getTextOrPath(this.userEvent);
  return 'When I press "' + label + '"';
}

EventsConverter.prototype.input = function(userEvent)
{
  this.userEvent = userEvent;

  var label =  EventsConverter.prototype.getInputLabelOrDomId(this.userEvent);
  var value =  EventsConverter.prototype.getInputValue(this.userEvent);
  return 'When I fill in "' + label + '" with "' + value + '"';
}

EventsConverter.prototype.getInputValue = function(userEvent)
{
  this.userEvent = userEvent;

  return this.userEvent.data.target.value;

}

EventsConverter.prototype.getInputLabelOrDomId = function(userEvent)
{
  this.userEvent = userEvent;

  if(this.userEvent.data.target.labels != "undefined")
  {
    if(this.userEvent.data.target.labels.length > 0)
    {
      if(this.userEvent.data.target.labels[0].innerText.length > 0)
      {
        return this.userEvent.data.target.labels[0].innerText;
      }
    }
  }

  return 'foo';
}

EventsConverter.prototype.getTextOrPath = function(userEvent)
{
  this.userEvent = userEvent;

  if(this.userEvent.data.target.nodeName != "undefined")
  {
    return this.userEvent.data.target.nodeName;
  }

  return this.userEvent.data.path[0].button;
}
