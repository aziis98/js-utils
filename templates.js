String.prototype.format = function() {
    const args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
	return typeof args[number] != 'undefined'
            ? args[number]
            : match
	;
    });
};

exports.compileTemplate = function compileTemplate(source, data) {
	data = data || {};

	const compiledTemplate = source.replace(/\{\{(.+?)\}\}/g, function(match, code) {
		with(data) {
			return eval(code);
		}
	});

	return $.parseHTML(compiledTemplate.trim())[0];
};
