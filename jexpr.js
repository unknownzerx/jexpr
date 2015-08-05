var jexpr_to_html = function(jexpr) {
    var r = document.createElement(jexpr[0]);

    for (var i = 1; i < jexpr.length; i++) {
        var x = jexpr[i];
        if (x instanceof Array) {
            r.appendChild(jexpr_to_html(x))
        } else if (x instanceof Object) {
            for (var key in x) {
                r.setAttribute(key, x[key]);
            }
        } else {
            r.innerText = x.toString();
        }
    }

    return r;
};

var jexpr2 =
    ["html",
        ["head",
            ["title", "hello"]
        ],
        ["body",
            ["p",
                {
                    id: "some-p",
                    style: "font-size: 12px;"
                },
                "world"],
            ["p", "or hello word"]]
    ];

var jexpr3 =
    ["ul", {
        id:"ul1",
        style:"color: red;"
    },
        ["li", "<script>alert('you are compromised');</script>"],
        ["li", "blahblah"]];

console.log(jexpr_to_html(jexpr2));
document.getElementsByTagName("body")[0].appendChild(jexpr_to_html(jexpr3));

var data = [{
    id: 1,
    info: "hello"
}, {
    id: 2,
    info: "world"
}];

var make_jexpr = function(data) {
    return [
        "ul", {
            id:"ul1",
            style:"color: red;"
        },
        // well, we are lacking of lisp-like `,@'
        data.forEach(function(x) {

        })
    ];

};
