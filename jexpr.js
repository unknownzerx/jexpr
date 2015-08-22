// prevent_script = true will prevent from creating scipt tag
// (by replacing it with a 'script_banned' tag currently)
var mk_jexpr = function(prevent_script) {
    var m = {};

    var is_script_tag = function(tag_string) {
        return tag_string.toLowerCase() == 'script';
    };

    m.to_dom_node = function(jexpr) {
        if (jexpr[0] instanceof Array) {
            var rs = [];
            jexpr.forEach(function(j0) {
                rs = rs.concat(m.to_dom_node(j0));
            });
            return rs;

        } else {
            var tag_string = jexpr[0];
            if (prevent_script && is_script_tag(tag_string)) {
                tag_string = 'script_banned';       // Em...
            }
            // TODO catch InvalidCharacterError
            var r = document.createElement(tag_string);

            for (var i = 1; i < jexpr.length; i++) {
                var x = jexpr[i];
                if (x instanceof Array) {
                    m.to_dom_node(x).forEach(function(xx) {
                        r.appendChild(xx);
                    });
                } else if (x instanceof Object) {
                    for (var key in x) {
                        try {
                            r.setAttribute(key, x[key]);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                } else {
                    r.appendChild(document.createTextNode(x.toString()));
                }
            }

            return [r];
        }
    };

    return m;
};
