function EventsConverter() {

}

EventsConverter.prototype.outputFeature = function(steps)
{
  this.steps = steps;
  var feature = '';

  this.steps.forEach(function(v, i)
  {
    feature = feature + v + "\n";
  });

  console.log(feature);
  return feature;
}

EventsConverter.prototype.iterateOverEvents = function(userEvents)
{
  var steps = [];
  this.userEvents = userEvents;

  this.userEvents.forEach(function(v, i)
  {
    steps.push(EventsConverter.prototype.stepType(v));
  });

  return steps;
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
     else if (this.userEvent.data.target.nodeName == "A") {
       var converted = EventsConverter.prototype.link(this.userEvent);
     }
   }

   return converted;
}

EventsConverter.prototype.link = function(userEvent)
{
  this.userEvent = userEvent;

  var link_text =  EventsConverter.prototype.getLinkNameOrId(this.userEvent);
  return 'When I follow "' + link_text + '"';
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

EventsConverter.prototype.getLinkNameOrId = function(userEvent)
{
  this.userEvent = userEvent;

  var labelOrId = 'not found';

  if(
      this.userEvent.data.target.innerText != "undefined"
      &&
      this.userEvent.data.target.innerText.length > 0
    )
  {
    labelOrId = this.userEvent.data.target.innerText;
  }
  else if( this.userEvent.data.target.id != '' ) {
      labelOrId = this.userEvent.data.target.id;
  }

  return labelOrId;
}

EventsConverter.prototype.getInputLabelOrDomId = function(userEvent)
{
  this.userEvent = userEvent;

  var labelOrId = 'not found';

  if(
      this.userEvent.data.target.labels != "undefined"
      &&
      this.userEvent.data.target.labels.length > 0
      &&
      this.userEvent.data.target.labels[0].innerText.length > 0
    )
  {
    labelOrId = this.userEvent.data.target.labels[0].innerText;
  }
  else if( this.userEvent.data.path[0].id != '' ) {
      labelOrId = this.userEvent.data.path[0].id;
  }

  return labelOrId;
}

EventsConverter.prototype.getTextOrPath = function(userEvent)
{
  this.userEvent = userEvent;
  var labelOrId;

  console.log(this.userEvent.data.target.outerText.length > 0);
  if(
      this.userEvent.data.target.outerText != "undefined"
      &&
      this.userEvent.data.target.outerText.length > 0
    )
  {
    labelOrId = this.userEvent.data.target.outerText;
  }
  else if( this.userEvent.data.path[0].id != '' ) {
      labelOrId = this.userEvent.data.path[0].id;
  }

  return labelOrId;
}
