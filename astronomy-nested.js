var Things = new Mongo.Collection('things');

var Thing = Astro.Class({
	name: 'Thing',
	collection: Things,
	fields: {
		obj: {
			type: 'object',
			default: function() {
				return {};
			}
		}
	}
});

var NestedThing = Astro.Class({
	name: 'Nested Thing',
	fields: {
		name: {
			type: 'string',
			default: function() {
				return '';
			}
		}
	}
});

Meteor.startup(function() {
	var thing = new Thing();
	thing.set('obj.nested', new NestedThing());
	var id = thing.save();
	thing.set('obj.nested.name', 'asd');
	thing.save();

	nested = thing.get('obj.nested');
	thing = Things.findOne(id);
	console.log('Nested before:');
	console.log(nested);
	console.log();
	console.log('Nested after:');
	console.log(thing.get('obj.nested'));
});
